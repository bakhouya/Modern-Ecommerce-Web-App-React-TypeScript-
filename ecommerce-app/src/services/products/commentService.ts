


import type {ProductCommentTypes, ProductCommentsResponse} from "../../types/commentTypes";
import { StoreApi } from "../storeApi";

export const getProductComments = async (productId: string): Promise<ProductCommentTypes[]> => {
    const response = await StoreApi.get<ProductCommentTypes[] | ProductCommentsResponse>(`/public/products/${productId}/comments/`);
    const data = response.data;
    if (Array.isArray(data)) {return data;}
    return data.results ?? data.data ?? [];
};
