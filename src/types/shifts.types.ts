import { IUser } from "./users.types"

export interface IShift {
  id?: string
  timestamp: Date
  user_id?: string
  user?: IUser
}
