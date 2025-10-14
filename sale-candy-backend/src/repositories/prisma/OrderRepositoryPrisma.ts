/*
 * pegando os contratos do OrderRepository e instanciando no prisma
 * aqui a forma de metodo é diferente, nomeMetodo(): Promise<T> { return...}
 */

import { Order } from "@prisma/client";
import { OrderDTO, OrderRepository } from "../OrderRepository";
import { prisma } from "../../../prisma/database";

export class OrderRepositoryPrisma implements OrderRepository {
  findAll(): Promise<Order[]> {
    return prisma.order.findMany();
  }

  findById(id: number): Promise<Order | null> {
    return prisma.order.findUnique({ where: { id } });
  }
  create(params: OrderDTO): Promise<Order> {
    return prisma.order.create({ data: params });
  }
  update(id: number, params: Partial<OrderDTO>): Promise<Order | null> {
    return prisma.order.update({
      where: { id },
      data: params,
    });
  }
  delete(id: number): Promise<Order | null> {
    return prisma.order.delete({ where: { id } });
  }
}
