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
