import { Order, OrderStatus } from "@prisma/client";

export interface OrderDTO {
  status: OrderStatus;
  totalAmount: number;
  userId: number;
}

export interface OrderRepository {
  findAll: () => Promise<Order[]>;
  findById: (id: number) => Promise<Order | null>;
  create: (params: OrderDTO) => Promise<Order>;
  update: (id: number, params: Partial<OrderDTO>) => Promise<Order | null>;
  delete: (id: number) => Promise<Order | null>;
}
