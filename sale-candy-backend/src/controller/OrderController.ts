import { Handler } from "express";
import { OrderService } from "../service/OrderService";
import { validateCreateOrder } from "./schemas/Orders/create";
import { validateUpdateOrder } from "./schemas/Orders/updateOrder";

export class OrderController {
  // injetando a dependencia do service
  constructor(private readonly orderService: OrderService) {}

  // metodos do controller
  index: Handler = async (req, res, next) => {
    try {
      const orders = await this.orderService.getAllOrders();
      return res.json(orders);
    } catch (error) {
      next(error);
    }
  };

  showById: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const order = await this.orderService.getFindById(id);
      return res.json(order);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const bodyOrder = validateCreateOrder.parse(req.body);
      const order = await this.orderService.createOrder(bodyOrder);
      return res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const bodyOrder = validateUpdateOrder.parse(req.body);
      const order = await this.orderService.updateOrder(id, bodyOrder);
      return res.json(order);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      await this.orderService.deleteOrder(id);
    } catch (error) {
      next(error);
    }
  };
}
