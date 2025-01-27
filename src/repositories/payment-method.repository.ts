import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { PaymentMethod } from "../models/payment-method.model.js";


export class PaymentMethodRepository {
  private collection: CollectionReference


  constructor() {
    this.collection = getFirestore().collection("payment-methods")
  }

  async getAll(): Promise<PaymentMethod[]> {
    const snapshot = await this.collection.get()
    return snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    }) as PaymentMethod[]
  }

  async getById(id: string): Promise<PaymentMethod | null> {
    const doc = await this.collection.doc(id).get()
    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data()
      } as PaymentMethod
    } else {
      return null
    }
  }

  async save(payhmentMethod: PaymentMethod) {
    await this.collection.add(payhmentMethod)
  }

  async update(payment: PaymentMethod) {
    let docRef = this.collection.doc(payment.id)
    await docRef.set({
      descricao: payment.descricao,
      ativa: payment.ativa
    })
  }

  async delete(id: string) {
    await this.collection.doc(id).delete()
  }
}