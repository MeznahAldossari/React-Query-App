import https from "./https"
import http from "./http"
import { productsInfo } from "../types/types"
import { cartInfo, userInfo } from "../types/types"

export const getProducts = async () =>{
   const data = await https.get<productsInfo[]>("/form")
   return data.data
}

export const getProductDetails =  async (id:string|undefined)=>{
    try{
        const data = await https.get<cartInfo>(`/form/${id}`)
        return data.data
    }
    catch(err){
        return null
    }
    
}

export const getUser = async (id:string)=>{
    try{
        const data = await http.get<userInfo>(`/Users/allUsers/${id}`)
        return data.data
    }
    catch(err){
        return null
    }
}

export const findUser = async ()=>{
   
    const data = await http.get<userInfo[]>(`/Users/allUsers/`)
    return data.data  
}

export const newUser = async (userDetails:userInfo)=>{
   
    const data = await http.post<userInfo>(`/Users/allUsers/`, userDetails)
    return data.data  
}

export const postProduct = async (id:string|undefined, useObject:userInfo)=>{
    const data = await http.put(`/Users/allUsers/${id}`, useObject)
    return data.data
}
