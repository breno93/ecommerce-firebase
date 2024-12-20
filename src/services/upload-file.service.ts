import fs from "node:fs";
import { getStorage, getDownloadURL } from "firebase-admin/storage"
import { fileTypeFromBuffer } from "file-type";



export class UploadFileService {

  constructor(private path: string = "") { }

  async upload(base64: string): Promise<string> {
    //aqui estou transformando o base64 em Buffer
    const fileBuffer = Buffer.from(base64, "base64")

    const fileType = await fileTypeFromBuffer(fileBuffer)

    //Aqui eu estou gravando essa imagem no disco, ou seja para que seja possivel fazer o upload dessa img para o firestorage
    const fileName = `image.${fileType?.ext}`
    fs.writeFileSync(fileName, fileBuffer)

    //aqui estou fazendo uma referencia ao nosso BUCKET no Fire Storage
    const bucket = getStorage().bucket("e-commerce-api-b6e5d.firebasestorage.app")
    const uploadResponse = await bucket.upload(fileName, {
      destination: this.path + fileName
    })

    return getDownloadURL(uploadResponse[0])

  }
}