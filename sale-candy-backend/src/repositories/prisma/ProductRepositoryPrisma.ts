import { Product } from "@prisma/client";
import { ProductDTO, ProductRepository } from "../ProductRepository";
import { prisma } from "../../../prisma/database";

export class ProductRepositoryPrisma implements ProductRepository {
  /**
   * Retorna todos os produtos cadastrados
   */
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  /**
   * Busca um produto pelo ID
   * Retorna null caso não exista
   */
  async findById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  /**
   * Cria um novo produto
   */
  async create(params: ProductDTO): Promise<Product> {
    const { name, description, priceProduct, stock } = params;

    return prisma.product.create({
      data: {
        name, // nome do produto
        description, // descrição do produto
        priceProduct, // preço unitário
        stock, // quantidade em estoque
      },
    });
  }

  /**
   * Atualiza um produto existente
   * Atualiza apenas os campos enviados
   */
  async update(
    id: number,
    params: Partial<ProductDTO>
  ): Promise<Product | null> {
    // Objeto de atualização montado dinamicamente
    const data: any = {};

    // Atualiza nome se enviado
    if (params.name !== undefined) {
      data.name = params.name;
    }

    // Atualiza descrição se enviada
    if (params.description !== undefined) {
      data.description = params.description;
    }

    // Atualiza preço se enviado
    if (params.priceProduct !== undefined) {
      data.priceProduct = params.priceProduct;
    }

    // Atualiza estoque se enviado
    if (params.stock !== undefined) {
      data.stock = params.stock;
    }

    return prisma.product.update({
      where: { id }, // identifica o produto
      data, // dados tratados
    });
  }

  /**
   * Remove um produto
   * OBS: se houver OrderItems relacionados,
   * o delete exige remoção prévia ou cascade
   */
  async delete(id: number): Promise<Product | null> {
    return prisma.product.delete({
      where: { id },
    });
  }
}
