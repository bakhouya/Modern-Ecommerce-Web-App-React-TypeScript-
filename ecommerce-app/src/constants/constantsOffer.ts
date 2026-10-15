

import type { Variant } from "../widgets/dashboard/offers/types";

export const TOTAL_STEPS = 5;

export const emptyVariant = (min_order_pieces: number = 2): Variant => ({
  min_order_pieces,
  discount_fixed_amount: '',
  discount_percentage: '',
});

