export interface userInfo{
  id?:string
  username: string,
  email: string,
  password: string
  cartItem?:cartInfo[]
}

export interface productsInfo{
  id:string,
  title:string,
  price:number,
  images:string,
  description?:string
  category?:{
    name:string
  }
}

export interface cartInfo extends productsInfo
{
  cartId?:string,
  total:number
  qty:number
  size?:string
}

