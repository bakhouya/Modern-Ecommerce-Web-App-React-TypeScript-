import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../../../../components/ui/SectionHeader';
import { LoadingDisplay } from '../../../../components/ui/LoadingDisplay';
import type { Product } from '../../../../services/products/productServices';

interface Props {
  products: Product[];
  selectedIds: string[];
  isLoading: boolean;
  error: unknown;
  onToggle: (id: string) => void;
  description?: string;
}

export const ProductsStep: React.FC<Props> = ({
  products,
  selectedIds,
  isLoading,
  error,
  onToggle,
  description,
}) => {
  const { t } = useTranslation();

  if (isLoading) return <LoadingDisplay />;

  if (error) {
    return <div className="text text_md text_danger">Error loading products</div>;
  }

  return (
    <div className="offer-form-card">
      <SectionHeader title={t('models.product.plural')} description={description} />

      <div className="check_cards">
        {products.map((product) => (
          <label key={product.id} htmlFor={product.id} className="check_item_card">
            <div className="flex_between_center">

              <div className="flex_start_center gap_12">
                {product.image?.[0]?.image ? (
                  <div className="image_sm">
                    <img src={product.image[0].image} alt={product.title} />
                  </div>
                ) : (
                  <div className="image_sm text text_lg">L</div>
                )}
                <div>
                  <div className="text text_md">{product.title}</div>
                  <div className="flex_start_center gap_12">
                    <div className="text text_sm">{product.price_sale} MAD</div>
                    <div className="slash" />
                    <div className="text text_sm">Stock: {product.stock}</div>
                  </div>
                </div>
              </div>

              <label className="switch" htmlFor={product.id}>
                <input type="checkbox" id={product.id}
                  checked={selectedIds.includes(product.id)} onChange={() => onToggle(product.id)}/>
                <span className="slider round" />
              </label>

            </div>
          </label>
        ))}
      </div>
    </div>
  );
};