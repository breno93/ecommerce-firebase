import { ErrorBase } from "./base.error";


export class EmailAlreadyExistsError extends ErrorBase {
  constructor(message = "O e-mail informado já está em uso") {
    super(409, message);
  }
}