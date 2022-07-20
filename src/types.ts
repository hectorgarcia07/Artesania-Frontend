import { AlertColor } from "@mui/material";
import { AxiosResponse } from "axios"

export interface Shoe {
  url: string;
  id: string;
  name: string;
  color: string;
  price: number;
  gender: Gender | null;
  age: Age | null;
  sizes: Array<Size>;
}

export interface Size {
  [key: string]: string | number;

  id: string;
  size: number;
  quantity: number;
}

export enum Age {
  ADULT = 'adult',
  KID = 'kid',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex'
}

export enum Role {
  ADMIN = 'admin',
  NORMAL = 'normal'
}

export type OnlyShoeData = Omit<Shoe, "id" | "sizes" | "url">
export type OnlySizesData = Omit<Size, 'id'>

export interface ShoeData extends OnlyShoeData{
  sizes: Omit<Size, 'id'>[],
  shoe_image: File | undefined
}

export interface ShoePostData extends OnlyShoeData {
  sizes: Omit<Size, 'id'>[],
  url: string
}

export interface FormError {
  error: AxiosResponse<any, any> | undefined
}

export interface Alert{
  isLoading: boolean;
  severityType: AlertColor;
  message: string;
  isActive: boolean;
}

export type User = UserObj | null

export interface UserObj{
  username: string,
  role: Role,
  id: string
}

export interface UserAuth {
  token: Token,
  user: User
}

export type Token = string | null