export interface Shoe {
  id: string;
  name: string;
  color: string;
  price: number;
  gender: Gender;
  sizes: Array<Size>;
}

export interface Size {
  id: string;
  size: number;
  quantity: number;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex'
}