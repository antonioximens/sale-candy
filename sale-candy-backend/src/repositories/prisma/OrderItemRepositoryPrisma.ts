import { OrderItem } from "@prisma/client";
import { OrderItemDTO, OrderItemRepository } from "../OrderItemRepository";
import { prisma } from "../../../prisma/database";

export class OrderItemRepositoryPrisma implements OrderItemRepository {
  async findAll(): Promise<OrderItem[]> {
    return await prisma.orderItem.findMany();
  }

  async findById(id: number): Promise<OrderItem | null> {
    return await prisma.orderItem.findUnique({ where: { id } });
  }

  async create(params: OrderItemDTO): Promise<OrderItem> {
    return await prisma.orderItem.create({ data: params });
  }

  async update(
    id: number,
    params: Partial<OrderItemDTO>
  ): Promise<OrderItem | null> {
    return await prisma.orderItem.update({
      where: { id },
      data: params,
    });
  }

  async delete(id: number): Promise<OrderItem | null> {
    return await prisma.orderItem.delete({ where: { id } });
  }
}
