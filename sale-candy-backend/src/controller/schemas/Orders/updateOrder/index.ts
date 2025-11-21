import z from "zod";

export const validateUpdateOrder = z.object({
  status: z
    .enum([
      "PENDING", // Pedido criado, aguardando pagamento ou processamento
      "PROCESSING", // Pagamento confirmado, separando produtos/preparando
      "SHIPPED", // Pedido enviado (com rastreio, se aplicável)
      "DELIVERED", // Pedido entregue ao cliente
      "CANCELLED", // Pedido cancelado antes da entrega
      "RETURNED", // Produto devolvido após entrega
    ])
    .optional(),
  totalAmount: z.number().nonnegative().optional(),
  userId: z.number().int().nonpositive().optional(),
});
