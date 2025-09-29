/*
 * criando rotas e validações necessarias com o zod
 * injetando dependencia do service
 * ---------------------------------
 * rotas a ser seguidas:
 * GET /api/product -> todos os produtos
 * GET /api/product/:id -> um produto especifico
 * POST /api/product -> criação de um produto
 * PUT /api/product/:id -> atualizar um prdotu especifico
 * DELETE /api/product/:id -> apagar um produto
 */

import { Handler } from "express";
import { ProductService } from "../service/ProductService";
import { validateCreateProduct } from "./schemas/Products/createProduct";
import { HttpError } from "../errors/Http-Error";
import { updatedProductZod } from "./schemas/Products/updatedProduct ";

export class ProductController {
  // injetando o service
  constructor(private readonly productService: ProductService) {}

  // GET /api/product
  index: Handler = async (req, res, next) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  //GET /api/product/:id
  showById: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const product = await this.productService.getById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  // POST /api/product
  create: Handler = async (req, res, next) => {
    try {
      const bodyProduct = validateCreateProduct.parse(req.body);
      const product = await this.productService.createProduct(bodyProduct);
      if (!product) throw new HttpError(400, "Failed to create product");
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  //PUT /api/product/:id
  update: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw new HttpError(400, "ID invalid");
      const updatedProduct = updatedProductZod.parse(req.body);
      const product = await this.productService.updateProduct(
        id,
        updatedProduct
      );
      if (!product) throw new HttpError(404, "Product not found");
      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /api/product/:id
  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw new HttpError(400, "ID invalid");

      const deleted = await this.productService.deleteProduct(id);
      if (!deleted) throw new HttpError(404, "Product not found!");

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
