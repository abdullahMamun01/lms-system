import { IUser } from "./user.interface"

declare global {
    namespace Express {
        interface User extends IUser {
            userId?: string ,
            _id?: string
        }
        interface Request {
            user: TUser

        }
    }
}