import { User, Token } from "../types";

export interface SignInResponse {
  user?: User,
  token?: Token,
  message: string,
  success: boolean
}

export const checkSignInResponse = (obj:any):SignInResponse => {
  return (obj as SignInResponse)
}