import z from "zod";

export const validateCreateOrder = z.object({
  status: z.enum([
    "PENDING", // Pedido criado, aguardando pagamento ou processamento
    "PROCESSING", // Pagamento confirmado, separando produtos/preparando
    "SHIPPED", // Pedido enviado (com rastreio, se aplicável)
    "DELIVERED", // Pedido entregue ao cliente
    "CANCELLED", // Pedido cancelado antes da entrega
    "RETURNED", // Produto devolvido após entrega
  ]),
  totalAmount: z.number().nonnegative(),
  userId: z.number().int().nonpositive(),
});
