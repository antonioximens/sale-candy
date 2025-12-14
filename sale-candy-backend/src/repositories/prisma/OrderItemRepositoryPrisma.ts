import { OrderItem } from "@prisma/client";
import { OrderItemDTO, OrderItemRepository } from "../OrderItemRepository";
import { prisma } from "../../../prisma/database";

export class OrderItemRepositoryPrisma implements OrderItemRepository {
  async findAll(): Promise<OrderItem[]> {
    return prisma.orderItem.findMany({
      include: {
        product: true, // traz os dados do produto relacionado
        Order: true, // traz os dados do pedido relacionado
      },
    });
  }

  async findById(id: number): Promise<OrderItem | null> {
    return prisma.orderItem.findUnique({
      where: { id },
      include: {
        product: true, // inclui produto
        Order: true, // inclui pedido
      },
    });
  }

  async create(params: OrderItemDTO): Promise<OrderItem> {
    const { quantity, price, productId, orderId } = params;

    return prisma.orderItem.create({
      data: {
        quantity, // quantidade do produto no pedido
        price, // preço do produto no momento da compra

        // Relaciona o item ao produto existente
        product: {
          connect: { id: productId },
        },

        // Relaciona o item ao pedido existente
        Order: {
          connect: { id: orderId },
        },
      },
    });
  }

  async update(
    id: number,
    params: Partial<OrderItemDTO>
  ): Promise<OrderItem | null> {
    // Objeto de atualização montado dinamicamente
    const data: any = {};

    // Atualiza quantidade se enviada
    if (params.quantity !== undefined) {
      data.quantity = params.quantity;
    }

    // Atualiza preço se enviado
    if (params.price !== undefined) {
      data.price = params.price;
    }

    // Se productId foi enviado, conecta a outro produto
    if (params.productId !== undefined) {
      data.product = {
        connect: { id: params.productId },
      };
    }

    // Se orderId foi enviado, conecta a outro pedido
    if (params.orderId !== undefined) {
      data.Order = {
        connect: { id: params.orderId },
      };
    }

    return prisma.orderItem.update({
      where: { id }, // identifica o item a ser atualizado
      data, // dados montados dinamicamente
    });
  }

  async delete(id: number): Promise<OrderItem | null> {
    return prisma.orderItem.delete({
      where: { id },
    });
  }
}
