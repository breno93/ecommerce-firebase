import { Request, Response } from "express"
import { PaymentMethodService } from "../services/payment-method.service.js"


export class PaymentMethodsController {
  static async getAll(req: Request, res: Response) {
    res.send(await new PaymentMethodService().getAll())
  }

  static async getById(req: Request, res: Response) {
    let paymentMethodId = req.params.id
    res.send(await new PaymentMethodService().getById(paymentMethodId))
  }

  static async save(req: Request, res: Response) {
    //Cria uma instância da classe PaymentMethodService
    //Chama o método save do serviço, passando os dados enviados no corpo da requisição (req.body)
    await new PaymentMethodService().save(req.body)
    res.status(201).send({
      message: "Forma de pagamento criada com sucesso"
    })
  }

  static async update(req: Request, res: Response) {
    let paymentMethodId = req.params.id
    let paymentMethod = req.body

    await new PaymentMethodService().update(paymentMethodId, paymentMethod)
    res.send({
      message: "Forma de pagamento alterada com sucesso"
    })
  }

  static async delete(req: Request, res: Response) {
    const paymentMethod = req.params.id
    await new PaymentMethodService().delete(paymentMethod)
    res.status(204).end("Pagamento deletado com sucesso")
  }
}