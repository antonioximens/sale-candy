import { OrderItem } from "@prisma/client";

export interface OrderItemDTO {
  quantity: number;
  price: number;
  productId: number;
  orderId: number;
}

export interface OrderItemRepository {
  findAll: () => Promise<OrderItem[]>;
  findById: (id: number) => Promise<OrderItem | null>;
  create: (params: OrderItemDTO) => Promise<OrderItem>;
  update: (
    id: number,
    params: Partial<OrderItemDTO>
  ) => Promise<OrderItem | null>;
  delete: (id: number) => Promise<OrderItem | null>;
}
