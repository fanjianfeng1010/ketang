export interface ResponseWithoutData {
  code: number
  msg: string
}

export interface ResponseWithData extends ResponseWithoutData {
  data: any
}
