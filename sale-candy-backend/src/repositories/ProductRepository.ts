import { Product } from "@prisma/client";

/*
 *criando os contratos de interfaces para o repositorio e prisma
 * forma do contrato =  nomeMetodo: () => Promise<objeto ou null>
 */

export interface ProductDTO {
  name: string;
  description: string;
  priceProduct: number;
  stock: number;
}
export interface ProductRepository {
  findAll: () => Promise<Product[]>;
  findById: (id: number) => Promise<Product | null>;
  create: (params: ProductDTO) => Promise<Product>;
  update: (id: number, params: Partial<ProductDTO>) => Promise<Product | null>;
  delete: (id: number) => Promise<Product | null>;
}
