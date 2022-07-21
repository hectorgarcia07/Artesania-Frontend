import { User, UserObj, Role } from "../types";

export const checkUserValidity = ():User => {
  try{
    const userFromLocalStorage = localStorage.getItem('user')
    if(!userFromLocalStorage){
      return null
    }
    
    const userParsed = JSON.parse(userFromLocalStorage)
    
    const username = isUsername(userParsed.username)
    const role = isRole(userParsed.role)
    const id = isID(userParsed.id)

    if(!username || !role || !id )
      return null
    
    return userParsed as UserObj
  }catch(e){
    return null
  }
}

const isUsername = (value:unknown):string | null => {
  if(value && typeof value == 'string' )
    return (value as string)
  return (value as null)
}


const isRole = (role:unknown):Role | null => {
  if(!role || !isString(role) || !checkEnumRole(role)){
    return null
  }
  return role;
};

const isID = (id:unknown):string | null => {
  if(!id || !isString(id)){
    return null
  }
  return (id as string)
}

const checkEnumRole = (role:string):role is Role => {
  return Object.values<string>(Role).includes(role);
};

const isString = (str:any): str is string => {
  return typeof str === 'string' || str instanceof String;
};
