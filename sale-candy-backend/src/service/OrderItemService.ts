/*
 * aplica a logica de negocio e passo uma injeção de dependencia para ir ao
 * contrato e instanciar o banco dados.
 * fazer tratamento de erros
 */

import { HttpError } from "../errors/Http-Error";
import {
  OrderItemDTO,
  OrderItemRepository,
} from "../repositories/OrderItemRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { OrderRepository } from "../repositories/OrderRepository";

export class OrderItemService {
  constructor(
    private readonly orderItemRepository: OrderItemRepository,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository
  ) {}

  private async verifyOrderItem(id: number) {
    const item = await this.orderItemRepository.findById(id);
    if (!item) throw new HttpError(404, "OrderItem not found!");
    return item;
  }

  private async verifyProduct(id: number) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new HttpError(404, "Product not found!");
    return product;
  }

  private async verifyOrder(id: number) {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new HttpError(404, "Order not found!");
    return order;
  }

  async getAllOrderItems() {
    return this.orderItemRepository.findAll();
  }

  async getById(id: number) {
    return this.verifyOrderItem(id);
  }

  async createOrderItem(params: OrderItemDTO) {
    await this.verifyProduct(params.productId);
    await this.verifyOrder(params.orderId);
    return this.orderItemRepository.create(params);
  }

  async updateOrderItem(id: number, params: Partial<OrderItemDTO>) {
    await this.verifyOrderItem(id);

    if (params.productId) await this.verifyProduct(params.productId);
    if (params.orderId) await this.verifyOrder(params.orderId);

    return this.orderItemRepository.update(id, params);
  }

  async deleteOrderItem(id: number) {
    await this.verifyOrderItem(id);
    return this.orderItemRepository.delete(id);
  }
}
