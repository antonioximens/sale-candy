import z from "zod";

export const updatedProductZod = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  priceProduct: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
});
