import express, { Request, Response, NextFunction } from "express"
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { UserService } from "../services/users.service.js";
import { ForbiddenError } from "../errors/forbidden.error.js";


export const auth = (app: express.Express) => {
  app.use(async (req: Request, res: Response, next: NextFunction) => {

    //aqui estou utilizando o split p/ transformar a string em um array e quebrando ela no parametro Bearer e a segunda parte o Token
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (req.method === "POST" && req.url.endsWith("/auth/login") || req.url.endsWith("/auth/recovery")) {
      return next()
    }

    if (token) {
      try {
        const decodeIdToken: DecodedIdToken = await getAuth().verifyIdToken(token, true)

        const user = await new UserService().getById(decodeIdToken.uid)
        if (!user) {
          return next(new ForbiddenError())
        }
        req.user = user

        console.log(decodeIdToken)
        return next();

      } catch (error) {
        next(new UnauthorizedError())
      }

    }

    next(new UnauthorizedError())
  })
}