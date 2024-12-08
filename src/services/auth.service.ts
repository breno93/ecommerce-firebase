import { EmailAlreadyExistsError } from "../errors/email-already-exist.error";
import { User } from "../models/user.model";
import { getAuth, UserRecord } from "firebase-admin/auth"
import { getAuth as getFirebaseAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth"

export class AuthService {
    async create(user: User): Promise<UserRecord> {
        return getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.nome,
        }).catch(err => {
            if (err.code === "auth/email-already-exists") {
                throw new EmailAlreadyExistsError();
            }
            throw err;
        })
    }

    login(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(getFirebaseAuth(), email, password)
    }
}