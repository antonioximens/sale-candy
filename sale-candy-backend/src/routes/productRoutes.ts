import { Router } from "express";
import { ProductRepositoryPrisma } from "../repositories/prisma/ProductRepositoryPrisma";
import { ProductService } from "../service/ProductService";
import { ProductController } from "../controller/ProductController";

const router = Router();

// Instanciando Repository
const productRepository = new ProductRepositoryPrisma();
// Instanciando Service
const productService = new ProductService(productRepository);
// Instanciando o Controller
const productController = new ProductController(productService);

// Criando as rotas
router.get("/product", productController.index);
router.get("/product/:id", productController.showById);
router.post("/product", productController.create);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.delete);

// Renomenado e colocando a exportção
export { router as productRoutes };
