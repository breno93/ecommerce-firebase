import { NotFoundError } from "../errors/not-found.error.js"
import { Product } from "../models/product.model.js"
import { CategoryRepository } from "../repositories/category.repository.js"
import { ProductRepository } from "../repositories/product.repository.js"


export class ProductService {

  private productRepository: ProductRepository
  private categoryRepository: CategoryRepository

  constructor() {
    this.productRepository = new ProductRepository()
    this.categoryRepository = new CategoryRepository()
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.getAll()
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.getById(id)
    if (!product) {
      throw new NotFoundError("Produto não encontrado")
    }
    return product
  }

  async save(product: Product) {
    const category = await this.getCategoryById(product.categoria.id)
    product.categoria = category
    await this.productRepository.save(product)
  }

  async update(id: string, product: Product) {
    const _product = await this.getById(id)
    const category = await this.getCategoryById(product.categoria.id)

    _product.nome = product.nome
    _product.descricao = product.descricao
    _product.imagem = product.imagem
    _product.preco = product.preco
    _product.categoria = category
    _product.ativa = product.ativa

    await this.productRepository.update(_product)
  }

  private async getCategoryById(id: string) {
    const category = await this.categoryRepository.getById(id)
    if (!category) {
      throw new NotFoundError("Categoria não encontrada")
    }
    return category
  }

  async delete(id: string) {
    await this.productRepository.delete(id)
  }

}