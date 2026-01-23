import z from 'zod';

export type PriceCardVariant = 'basic' | 'pro' | 'enterprise';

// Helper to coerce string to number
const coerceToNumber = z.union([
  z.number(),
  z.string().transform((val) => {
    const num = parseInt(val, 10);
    return isNaN(num) ? undefined : num;
  }),
]).optional();

export const productMetadataSchema = z
  .object({
    bottle_size: z.string().optional(), // e.g., "500ml"
    purchase_date: z.string().optional(), // ISO date string
    stock_count: coerceToNumber, // Can be string or number from Stripe metadata
    harvest_year: coerceToNumber, // Can be string or number from Stripe metadata
    // Keep legacy fields for backward compatibility during migration
    price_card_variant: z.enum(['basic', 'pro', 'enterprise']).optional(),
    generated_images: z.string().optional(),
    image_editor: z.enum(['basic', 'pro']).optional(),
    support_level: z.enum(['email', 'live']).optional(),
  })
  .transform((data) => ({
    bottleSize: data.bottle_size,
    purchaseDate: data.purchase_date,
    stockCount: data.stock_count,
    harvestYear: data.harvest_year,
    // Legacy fields (for backward compatibility)
    priceCardVariant: data.price_card_variant || 'basic',
    generatedImages: data.generated_images ? parseInt(data.generated_images) : undefined,
    imageEditor: data.image_editor,
    supportLevel: data.support_level,
  }));

export type ProductMetadata = z.infer<typeof productMetadataSchema>;
