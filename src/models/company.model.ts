import { Joi } from "celebrate"

export type Company = {
  id?: string
  logomarca: string
  cpfCnpj: string
  razaoSocial: string
  nomeFantasia: string
  telefone: string
  horarioFuncionamento: string
  endereco: string
  localizacao: string
  taxaEntrega: string
  ativa: boolean
}

export const newCompanySchema = Joi.object().keys({
  //a logomarca está como .allow(null) para nao precisar remover a logomarca no body quando efetuar o post
  logomarca: Joi.string().allow(null),

  //aqui estou utilizando o alternates para que o Joi faça a verificação das alternativas que coloquei no try(...)
  cpfCnpj: Joi.alternatives().try(
    Joi.string().length(11).required(),
    Joi.string().length(14).required()
  ),

  razaoSocial: Joi.string().required(),
  nomeFantasia: Joi.string().required(),
  telefone: Joi.string().regex(/^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/).required(),
  horarioFuncionamento: Joi.string().required(),
  endereco: Joi.string().required(),
  localizacao: Joi.string().required(),
  taxaEntrega: Joi.number().required(),

  //Aqui eu estou dizendo que o "ativa" só é permitido apenas TRUE e por padrão ele já é TRUE, caso eu nao insira no body
  ativa: Joi.boolean().only().allow(true).default(true)
})

export const updateCompanySchema = Joi.object().keys({
  //a logomarca está como .allow(null) para nao precisar remover a logomarca no body quando efetuar o post
  logomarca: Joi.string().allow(null),

  //aqui estou utilizando o alternates para que o Joi faça a verificação das alternativas que coloquei no try(...)
  cpfCnpj: Joi.alternatives().try(
    Joi.string().length(11).required(),
    Joi.string().length(14).required()
  ),

  razaoSocial: Joi.string().required(),
  nomeFantasia: Joi.string().required(),
  telefone: Joi.string().regex(/^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/).required(),
  horarioFuncionamento: Joi.string().required(),
  endereco: Joi.string().required(),
  localizacao: Joi.string().required(),
  taxaEntrega: Joi.number().required(),

  //Aqui eu estou dizendo que o "ativa" só é permitido apenas TRUE e por padrão ele já é TRUE, caso eu nao insira no body
  ativa: Joi.boolean().required()
})