/*
 * aplica a logica de negocio e passo uma injeção de dependencia para ir ao
 * contrato e instanciar o banco dados.
 * fazer tratamento de erros
 */

import { HttpError } from "../errors/Http-Error";
import {
  ProductDTO,
  ProductRepository,
} from "../repositories/ProductRepository";

export class ProductService {
  // injeção de dependencia, passando dados para o contrato > ProductRepository
  constructor(private readonly productRepository: ProductRepository) {}

  // metodo generico de mensagem e erro
  private async verifyProduct(id: number) {
    const productExists = await this.productRepository.findById(id);
    if (!productExists) throw new HttpError(404, "Product not found!");
    return productExists;
  }

  // buscando todos os produtos
  async getAllProducts() {
    return this.productRepository.findAll();
  }

  // buscando um produto
  async getById(id: number) {
    return this.verifyProduct(id);
  }

  // criando um produto
  async createProduct(params: ProductDTO) {
    return this.productRepository.create(params);
  }

  // atualizando um produto
  async updateProduct(id: number, params: Partial<ProductDTO>) {
    await this.verifyProduct(id);
    return this.productRepository.update(id, params);
  }

  // deletando um produto
  async deleteProduct(id: number) {
    await this.verifyProduct(id);
    return this.productRepository.delete(id);
  }
}
