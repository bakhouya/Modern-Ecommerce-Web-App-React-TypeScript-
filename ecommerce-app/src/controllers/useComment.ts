




import { useQuery } from "@tanstack/react-query";
import { getProductComments } from "../services/products/commentService";


export const useComment = (productId?: string) => {
  return useQuery({
    queryKey: ["public-product-comments", productId],
    queryFn: () => getProductComments(productId!),
    enabled: Boolean(productId),
    staleTime: 1000 * 60 * 2,
  });
};
