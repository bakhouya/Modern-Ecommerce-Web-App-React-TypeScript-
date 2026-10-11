import { z } from 'zod';

// ========== Reusable ==========
const moneyString = z
  .string()
  .regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount (e.g. 100.00)')
  .nullable();

const positiveMoney = moneyString.refine(
  (val) => val === null || parseFloat(val) > 0,
  { message: 'Must be > 0' }
);

const percentage = z.number().min(0).max(100).nullable();

// ========== Variant ==========
const variantSchema = z.object({
  min_order_pieces: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
  discount_fixed_amount: moneyString,
  discount_percentage: percentage,
});

// ========== Main Schema ==========
export const offerSchema = z.object({
    // Relations
    products: z.array(z.string().uuid()).min(1, 'Select at least one product'),
    offer_variant: z.array(variantSchema).default([]),

    // Metadata
    title: z.string().min(1, 'Title required'),
    description: z.string().optional(),
    image: z.string().url().nullable().optional(),

    // Types
    discount_type: z.enum(['FIXED', 'PERCENTAGE']),
    condition_type: z.enum(['PRICE', 'QUANTITY']),

    // PRICE fields (root)
    min_order_price: moneyString,
    discount_fixed_amount: moneyString,
    discount_percentage: percentage,

    // Dates & Status
    start_date: z.string().datetime({ offset: true }),
    end_date: z.string().datetime({ offset: true }),
    status: z.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    const isPrice = data.condition_type === 'PRICE';
    const isQuantity = data.condition_type === 'QUANTITY';
    const isFixed = data.discount_type === 'FIXED';
    const isPercent = !isFixed;

    // -------- PRICE --------
    if (isPrice) {
      // min_order_price wajba
      if (!data.min_order_price || parseFloat(data.min_order_price) <= 0) {
        ctx.addIssue({ code: 'custom', message: 'min_order_price > 0 required', path: ['min_order_price'] });
      }
      // variants mamnu3in
      if (data.offer_variant.length) {
        ctx.addIssue({ code: 'custom', message: 'Variants must be empty for PRICE', path: ['offer_variant'] });
      }
      // Discount root fields
      if (isFixed) {
        if (!data.discount_fixed_amount || parseFloat(data.discount_fixed_amount) <= 0) {
          ctx.addIssue({ code: 'custom', message: 'Fixed amount > 0 required', path: ['discount_fixed_amount'] });
        }
        if (data.discount_percentage) {
          ctx.addIssue({ code: 'custom', message: 'Percentage must be null for FIXED', path: ['discount_percentage'] });
        }
      } else {
        if (!data.discount_percentage || data.discount_percentage <= 0) {
          ctx.addIssue({ code: 'custom', message: 'Percentage (1-100) required', path: ['discount_percentage'] });
        }
        if (data.discount_fixed_amount && parseFloat(data.discount_fixed_amount) > 0) {
          ctx.addIssue({ code: 'custom', message: 'Fixed amount must be null for PERCENTAGE', path: ['discount_fixed_amount'] });
        }
      }
    }

    // -------- QUANTITY --------
    if (isQuantity) {
      // Root fields must be null
      if (data.min_order_price && parseFloat(data.min_order_price) > 0) {
        ctx.addIssue({ code: 'custom', message: 'min_order_price must be null', path: ['min_order_price'] });
      }
      if (data.discount_fixed_amount && parseFloat(data.discount_fixed_amount) > 0) {
        ctx.addIssue({ code: 'custom', message: 'Root fixed amount must be null', path: ['discount_fixed_amount'] });
      }
      if (data.discount_percentage) {
        ctx.addIssue({ code: 'custom', message: 'Root percentage must be null', path: ['discount_percentage'] });
      }

      // Variants required
      if (!data.offer_variant.length) {
        ctx.addIssue({ code: 'custom', message: 'At least one variant required', path: ['offer_variant'] });
      } else {
        // Validate each variant based on discount_type
        data.offer_variant.forEach((v, idx) => {
          if (isFixed) {
            if (!v.discount_fixed_amount || parseFloat(v.discount_fixed_amount) <= 0) {
              ctx.addIssue({ code: 'custom', message: `V${idx+1}: Fixed amount > 0`, path: ['offer_variant', idx, 'discount_fixed_amount'] });
            }
            if (v.discount_percentage) {
              ctx.addIssue({ code: 'custom', message: `V${idx+1}: Percentage must be null`, path: ['offer_variant', idx, 'discount_percentage'] });
            }
          } else {
            if (!v.discount_percentage || v.discount_percentage <= 0) {
              ctx.addIssue({ code: 'custom', message: `V${idx+1}: Percentage (1-100)`, path: ['offer_variant', idx, 'discount_percentage'] });
            }
            if (v.discount_fixed_amount && parseFloat(v.discount_fixed_amount) > 0) {
              ctx.addIssue({ code: 'custom', message: `V${idx+1}: Fixed amount must be null`, path: ['offer_variant', idx, 'discount_fixed_amount'] });
            }
          }
        });
        // Check duplicates
        const pieces = data.offer_variant.map(v => v.min_order_pieces);
        if (new Set(pieces).size !== pieces.length) {
          ctx.addIssue({ code: 'custom', message: 'min_order_pieces must be unique', path: ['offer_variant'] });
        }
      }
    }

    // Dates
    if (data.start_date && data.end_date) {
      const start = new Date(data.start_date);
      const end = new Date(data.end_date);
      if (start >= end) {
        ctx.addIssue({ code: 'custom', message: 'End date after start date', path: ['end_date'] });
      }
    }
  });

export type OfferFormData = z.infer<typeof offerSchema>;