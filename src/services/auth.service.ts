
import { EmailAlreadyExistsError } from "../errors/email-already-exist.error.js";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { User } from "../models/user.model.js";
import { getAuth, UpdateRequest, UserRecord } from "firebase-admin/auth"
import { getAuth as getFirebaseAuth, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential } from "firebase/auth"


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

    async update(id: string, user: User) {
        const props: UpdateRequest = {
            displayName: user.nome,
            email: user.email,
        }

        if (user.password) {
            props.password = user.password
        }

        await getAuth().updateUser(id, props)
    }

    async login(email: string, password: string): Promise<UserCredential> {
        return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
            .catch(err => {

                if (err.code === "auth/invalid-credential") {
                    throw new UnauthorizedError();
                }

                throw err
            })
    }

    async delete(id: string) {
        await getAuth().deleteUser(id)
    }

    async recovery(email: string) {
        //sendPasswordResetEmail é uma função do firebase, o getFireBaseAuth nao é o do admin é do proprio firebase
        await sendPasswordResetEmail(getFirebaseAuth(), email)
    }
}
