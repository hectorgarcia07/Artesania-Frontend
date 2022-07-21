import { checkUserValidity } from "../services/checkUserValidity";
import { checkTokenValidity } from "../services/checkTokenValidity";

export const checkLocalStorageValidity = () => {
  const user = checkUserValidity()
  const token = checkTokenValidity()

  return (user && token) ? { user, token } : {user: null, token: null}
}