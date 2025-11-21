import { Router } from "express";
import { OrderRepositoryPrisma } from "../repositories/prisma/OrderRepositoryPrisma";
import { OrderService } from "../service/OrderService";
import { OrderController } from "../controller/OrderController";

const router = Router();

// Criando a injecções
const orderRepository = new OrderRepositoryPrisma();
// Instanciando o service
const orderService = new OrderService(orderRepository);
// Instanciando o controller
const orderController = new OrderController(orderService);

// Criando rotas
router.get("/order", orderController.index);
router.get("/order/:id", orderController.showById);
router.post("/order", orderController.create);
router.put("/order/:id", orderController.update);
router.delete("/order/:id", orderController.delete);

// Renomenando e exportando
export { router as orderRoutes };
