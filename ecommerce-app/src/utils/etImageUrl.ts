


// const API_URL = import.meta.env.VITE_API_URL;

// export default function getImageUrl(image?: string | null): string {
//   if (!image || !API_URL) return "";
//   try {
//     const backendOrigin = new URL(API_URL).origin;
//     const url = new URL(image, backendOrigin);

//     // Accept only images from our backend
//     if (url.origin !== backendOrigin) return "";

//     // Accept only paths inside /media/
//     if (!url.pathname.startsWith("/media/")) return "";

//     const imagePath = url.pathname.slice("/media/".length);

//     if (!imagePath || imagePath.split("/").some((part) => !part || part === "." || part === "..") ||
//       !/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(imagePath)
//     ) {
//       return "";
//     }

//     // Route through the Vercel function
//     return `/api/media/${imagePath}`;
//   } catch {return "";}
// }





const API_URL = import.meta.env.VITE_API_URL;

export default function getImageUrl(image?: string | null): string {
  if (!image || !API_URL) return "";

  try {
    const backendOrigin = new URL(API_URL).origin;
    const url = new URL(image, backendOrigin);

    if (url.origin !== backendOrigin) return "";
    if (!url.pathname.startsWith("/media/")) return "";

    const imagePath = url.pathname.slice("/media/".length);

    if (
      !imagePath ||
      imagePath.split("/").some(
        (part) => !part || part === "." || part === ".."
      ) ||
      !/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(imagePath)
    ) {
      return "";
    }

    // Local development: use Vite's proxy
    if (import.meta.env.DEV) {
      return `/api/media/${imagePath}`;
    }

    // Production: use the Vercel Function
    return `/v1/api/image?path=${encodeURIComponent(imagePath)}`;
  } catch {
    return "";
  }
}



