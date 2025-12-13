import { Router } from "express";
import { OrderItemRepositoryPrisma } from "../repositories/prisma/OrderItemRepositoryPrisma";
import { ProductRepositoryPrisma } from "../repositories/prisma/ProductRepositoryPrisma";
import { OrderRepositoryPrisma } from "../repositories/prisma/OrderRepositoryPrisma";
import { OrderItemService } from "../service/OrderItemService";
import { OrderItemController } from "../controller/OrderItemController";

const router = Router();

// criando a injecao de dependencias
const orderItemRepository = new OrderItemRepositoryPrisma();
const productRepository = new ProductRepositoryPrisma();
const orderRepository = new OrderRepositoryPrisma();
const orderItemService = new OrderItemService(
  orderItemRepository,
  productRepository,
  orderRepository
);
// Instanciando o controller
const orderController = new OrderItemController(orderItemService);

// Criando rotas
router.get("/order-item", orderController.index);
router.get("/order-item/:id", orderController.showById);
router.post("/order-item", orderController.create);
router.put("/order-item/:id", orderController.update);
router.delete("/order-item/:id", orderController.delete);
// Renomenando e exportando
export { router as orderItemRoutes };
