import z from "zod";

export const validateCreateProduct = z.object({
  name: z.string().trim(),
  description: z.string().trim(),
  priceProduct: z.number().nonnegative(), // não negativo
  stock: z.number().int().nonnegative().default(0), // inteiro e não negativo
});
