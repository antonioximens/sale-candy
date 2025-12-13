import { Handler } from "express";
import { OrderItemService } from "../service/OrderItemService";
import { validateCreateOrderItem } from "./schemas/OrderItem/validateCreateOrderItem";
import { validateUpdateOrderItem } from "./schemas/OrderItem/validateUpdateOrderItem";

export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  index: Handler = async (req, res, next) => {
    try {
      const items = await this.orderItemService.getAllOrderItems();
      return res.json(items);
    } catch (error) {
      next(error);
    }
  };

  showById: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const item = await this.orderItemService.getById(id);
      return res.json(item);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = validateCreateOrderItem.parse(req.body);
      const item = await this.orderItemService.createOrderItem(body);
      return res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const body = validateUpdateOrderItem.parse(req.body);
      const item = await this.orderItemService.updateOrderItem(id, body);
      return res.json(item);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      await this.orderItemService.deleteOrderItem(id);
    } catch (error) {
      next(error);
    }
  };
}
