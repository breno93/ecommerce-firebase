import fs from "fs";




export class UploadFileService {

  constructor(/*private path: string = ""*/) { }

  async upload(base64: string) {
    //aqui estou transformando o base64 em Buffer
    const fileBuffer = Buffer.from(base64, "base64")

    //Aqui eu estou gravando essa imagem no disco, ou seja para que seja possivel fazer o upload dessa img para o firestorage
    fs.writeFileSync("image.png", fileBuffer)

  }
}