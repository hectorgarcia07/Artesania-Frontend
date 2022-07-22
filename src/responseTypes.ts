import { Shoe } from './types'

export interface GetAllResponse {
  statusCode: number,
  message: string,
  data: Shoe[] | null,
}

export interface ImgUploadResponse {
  url: string
}

export interface DeleteResponse{
  statusCode: number,
  message: string,
}

export interface CreateShoeResponse {
  data: Shoe | null,
  message: string,
  statusCode: number
}

export type UpdateShoeResponse = CreateShoeResponse