/*
 * pegando os contratos do OrderRepository e instanciando no prisma
 * aqui a forma de metodo é diferente, nomeMetodo(): Promise<T> { return...}
 */

import { Order } from "@prisma/client";
import { OrderDTO, OrderRepository } from "../OrderRepository";
import { prisma } from "../../../prisma/database";

export class OrderRepositoryPrisma implements OrderRepository {
  async findAll(): Promise<Order[]> {
    return await prisma.order.findMany();
  }

  async findById(id: number): Promise<Order | null> {
    return await prisma.order.findUnique({ where: { id } });
  }
  async create(params: OrderDTO): Promise<Order> {
    return await prisma.order.create({ data: params });
  }
  async update(id: number, params: Partial<OrderDTO>): Promise<Order | null> {
    return await prisma.order.update({
      where: { id },
      data: params,
    });
  }
  async delete(id: number): Promise<Order | null> {
    return await prisma.order.delete({ where: { id } });
  }
}
