import { CollectionReference, getFirestore, QuerySnapshot } from "firebase-admin/firestore";
import { Product } from "../models/product.model.js";


export class ProductRepository {
  private collection: CollectionReference

  //Define o método construtor da classe, 
  // que é chamado automaticamente quando uma instância da classe é criada.
  constructor() {
    //Acessa a coleção chamada products no Firestore.
    this.collection = getFirestore().collection("products")
  }

  async getAll(): Promise<Product[]> {
    const snapshot = await this.collection.get()
    return this.snapshotToArray(snapshot)
  }

  async search(categoriaId: string): Promise<Product[]> {
    //Estou utilizando o collection.where para fazer a busca em parametros
    const snapshot = await this.collection.where("categoria.id", "==", categoriaId).get()
    return this.snapshotToArray(snapshot)
  }

  private snapshotToArray(snapshot: QuerySnapshot): Product[] {
    return snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    }) as Product[]
  }

  async getById(id: string): Promise<Product | null> {
    const doc = await this.collection.doc(id).get()
    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data()
      } as Product
    } else {
      return null
    }
  }

  async save(product: Product) {
    await this.collection.add(product)
  }

  async update(product: Product) {
    let docRef = this.collection.doc(product.id!)
    await docRef.set({
      nome: product.nome,
      descricao: product.descricao,
      preco: product.preco,
      imagem: product.imagem,
      categoria: product.categoria,
      ativa: product.ativa

    })
  }

  async delete(id: string) {
    await this.collection.doc(id).delete()
  }
}