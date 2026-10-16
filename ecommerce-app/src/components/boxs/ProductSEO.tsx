


import { Helmet } from "react-helmet-async";

interface ProductImageSEO {
  image?: string | null;
  image_url?: string | null;
  url?: string | null;
}

interface ProductSEOData {
  id: string | number;
  title: string;
  details?: string | null;
  description?: string | null;
  price_sale?: string | number | null;
  price_regular?: string | number | null;
  images_details?: ProductImageSEO[];
}

interface ProductVariantSEO {
  id: string | number;
  price?: string | number | null;
  total_stock?: number | null;
}

interface ProductSEOProps {
  product: ProductSEOData;
  selectedVariant?: ProductVariantSEO | null;
  currencySymbol?: string;
  currentStock: number;
}

const SITE_NAME = "Mavora";
const DEFAULT_DESCRIPTION = "Découvrez ce produit sur Mavora, votre boutique en ligne au Maroc.";

const toAbsoluteUrl = (value?: string | null): string => {
  if (!value) return "";

  try {
    return new URL(value, window.location.origin).href;
  } catch {
    return "";
  }
};

const cleanText = (value?: string | null): string => (value ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export default function ProductSEO({ product, selectedVariant, currencySymbol = "MAD", currentStock,}: ProductSEOProps) {
  const title = `${cleanText(product.title)} | ${SITE_NAME}`;

  const description = cleanText(product.description) || cleanText(product.details) || DEFAULT_DESCRIPTION;

  const canonical = `${window.location.origin}${window.location.pathname}`;

  const imageData = product.images_details?.[0];

  const image = toAbsoluteUrl(imageData?.image || imageData?.image_url || imageData?.url);

  const rawPrice = selectedVariant?.price ?? product.price_sale ?? product.price_regular;

  const price = Number(rawPrice);
  const hasValidPrice = Number.isFinite(price) && price >= 0;
  const inStock = currentStock > 0;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: cleanText(product.title),
    description,
    url: canonical,
    ...(image ? { image: [image] } : {}),
    sku: String(selectedVariant?.id ?? product.id),
    offers: {
      "@type": "Offer",
      url: canonical,
      priceCurrency: currencySymbol === "DH" ? "MAD" : currencySymbol,
      ...(hasValidPrice ? { price: price.toFixed(2) } : {}),
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <Helmet>
      <html lang="fr" />
      <title>{title}</title>

      <meta name="description" content={description.slice(0, 160)} />
      <meta name="robots" content="index, follow, max-image-preview:large" />

      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="product" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description.slice(0, 200)} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="fr_MA" />

      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={cleanText(product.title)} />
        </>
      )}

      {hasValidPrice && (
        <>
          <meta property="product:price:amount" content={price.toFixed(2)} />
          <meta
            property="product:price:currency"
            content={currencySymbol === "DH" ? "MAD" : currencySymbol}
          />
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description.slice(0, 200)} />

      {image && <meta name="twitter:image" content={image} />}

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

