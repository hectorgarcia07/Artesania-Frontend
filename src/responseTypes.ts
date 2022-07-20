import { Shoe } from './types'

export interface GetAllResponse {
  statusCode: number,
  message: string,
  data: Shoe[] | null,
}