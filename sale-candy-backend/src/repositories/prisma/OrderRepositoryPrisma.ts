import { Order } from "@prisma/client";
import { OrderDTO, OrderRepository } from "../OrderRepository";
import { prisma } from "../../../prisma/database";

export class OrderRepositoryPrisma implements OrderRepository {
  async findAll(): Promise<Order[]> {
    return prisma.order.findMany({
      include: {
        user: true, // usuário dono do pedido
        items: true, // itens do pedido
      },
    });
  }

  async findById(id: number): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: true, // dados do usuário
        items: {
          include: {
            product: true, // produto relacionado a cada item
          },
        },
      },
    });
  }

  async create(params: OrderDTO): Promise<Order> {
    const { status, totalAmount, userId } = params;

    return prisma.order.create({
      data: {
        status, // status inicial do pedido
        totalAmount, // valor total calculado previamente

        // Relaciona o pedido ao usuário existente
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async update(id: number, params: Partial<OrderDTO>): Promise<Order | null> {
    // Objeto de atualização construído dinamicamente
    const data: any = {};

    // Atualiza status se enviado
    if (params.status !== undefined) {
      data.status = params.status;
    }

    // Atualiza totalAmount se enviado
    if (params.totalAmount !== undefined) {
      data.totalAmount = params.totalAmount;
    }

    // Caso deseje trocar o usuário do pedido
    if (params.userId !== undefined) {
      data.user = {
        connect: { id: params.userId },
      };
    }

    return prisma.order.update({
      where: { id }, // identifica o pedido
      data, // dados tratados
    });
  }

  async delete(id: number): Promise<Order | null> {
    return prisma.order.delete({
      where: { id },
    });
  }
}
