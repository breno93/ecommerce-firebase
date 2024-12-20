import fs from "node:fs";
import { getStorage, getDownloadURL } from "firebase-admin/storage"
import { fileTypeFromBuffer } from "file-type";
import { randomUUID } from "node:crypto";
import { ValidationError } from "../errors/validation.error.js";

export class UploadFileService {

  constructor(private path: string = "") { }

  async upload(base64: string): Promise<string> {
    //aqui estou transformando o base64 em Buffer
    const fileBuffer = Buffer.from(base64, "base64")

    //aqui estou criando uma validação caso a extensão nao seja válida...
    const fileType = await fileTypeFromBuffer(fileBuffer)
    if (!fileType) {
      throw new ValidationError("A extensão do arquivo não é válida!")
    }

    if (fileType.mime !== "image/jpeg" && fileType.mime !== "image/png") {
      throw new ValidationError("A imagem deve ser PNG ou JPEG")
    }

    //Aqui eu estou gravando essa imagem no disco, ou seja para que seja possivel fazer o upload dessa img para o firestorage
    //randomUUID é uma função do proprio javascript, ele gera um hash dinamico para que possamos substituir pelo nome image.
    //...ou seja, agora a image está sendo salva por um id randomico, para que nao subscreva no nosso storage
    const fileName = `${randomUUID().toString()}.${fileType?.ext}`
    fs.writeFileSync(fileName, fileBuffer)

    //aqui estou fazendo uma referencia ao nosso BUCKET no Fire Storage
    const bucket = getStorage().bucket("e-commerce-api-b6e5d.firebasestorage.app")
    const uploadResponse = await bucket.upload(fileName, {
      destination: this.path + fileName
    })

    //unlinkSync é utilizado para remover as img criadas no corpo do nosso projeto
    fs.unlinkSync(fileName);

    return getDownloadURL(uploadResponse[0])
  }
}