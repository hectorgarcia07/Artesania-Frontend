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