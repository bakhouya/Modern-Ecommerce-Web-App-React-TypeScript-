



export interface ProductCommentTypes {
  id: number | string;
  comment: string;
  rating: number;
  image?: string | null;
  created_at: string;
  updated_at?: string;
  visitor_details?: {
    id?: number | string;
    user_agent?: string;
  } | null;
}

export interface ProductCommentsResponse {
  results?: ProductCommentTypes[];
  data?: ProductCommentTypes[];
}

