import { z } from "zod";

export const validateCreateOrderItem = z.object({
  quantity: z.number().int().min(1).optional().default(1),
  price: z.number().nonnegative(),
  productId: z.number().int().positive(),
  orderId: z.number().int().positive(),
});
