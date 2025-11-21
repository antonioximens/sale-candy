import { HttpError } from "../errors/Http-Error";
import { OrderDTO, OrderRepository } from "../repositories/OrderRepository";

export class OrderService {
  // injetando a dependencia do OrderRepository
  constructor(private readonly orderRepository: OrderRepository) {}

  // procura order, evitando redundancia
  private async verifyOrder(id: number) {
    const orderExists = await this.orderRepository.findById(id);
    if (!orderExists) throw new HttpError(404, "Order not found!");
    return orderExists;
  }

  // traz todas as orders que existem, logo implemento a paginação
  // GET /api/orders
  async getAllOrders() {
    return await this.orderRepository.findAll();
  }

  // procura a order pelo id
  // GET /api/orders/:id
  async getFindById(id: number) {
    return await this.verifyOrder(id);
  }

  // criação do order
  // POST /api/orders
  async createOrder(params: OrderDTO) {
    return await this.orderRepository.create(params);
  }

  // Editar um order
  // PUT /pi/orders/:id
  async updateOrder(id: number, params: Partial<OrderDTO>) {
    await this.verifyOrder(id);
    return await this.orderRepository.update(id, params);
  }

  // Deletar um order
  // DELETE /api/orders/:id
  async deleteOrder(id: number) {
    await this.verifyOrder(id);
    return await this.orderRepository.delete(id);
  }
}
