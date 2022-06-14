export interface Shoe {
  id: string;
  name: string;
  color: string;
  price: number;
  gender: Gender | null;
  sizes: Array<Size>;
}

export interface Size {
  [key: string]: string | number;

  id: string;
  size: number;
  quantity: number;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex'
}

export type OnlyShoeData = Omit<Shoe, "id" | "sizes">
export type OnlySizesData = Omit<Size, 'id'>
export interface ShoeData extends OnlyShoeData{
  sizes: Omit<Size, 'id'>[]
}