/*
 * pegando os contratos do ProductRepository e instanciando no prisma
 * aqui a forma de metodo é diferente, nomeMetodo(): Promise<T> { return...}
 */

import { Product } from "@prisma/client";
import { ProductDTO, ProductRepository } from "../ProductRepository";
import { prisma } from "../../../prisma/database";

export class ProductRepositoryPrisma implements ProductRepository {
  async findAll(): Promise<Product[]> {
    return await prisma.product.findMany();
  }

  async findById(id: number): Promise<Product | null> {
    return await prisma.product.findUnique({ where: { id } });
  }

  async create(params: ProductDTO): Promise<Product> {
    return await prisma.product.create({ data: params });
  }

  async update(
    id: number,
    params: Partial<ProductDTO>
  ): Promise<Product | null> {
    return await prisma.product.update({ where: { id }, data: params });
  }
  async delete(id: number): Promise<Product | null> {
    return await prisma.product.delete({ where: { id } });
  }
}
