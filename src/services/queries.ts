import { useMutation, useQuery } from "@tanstack/react-query"
import { getProducts, getProductDetails, getUser, postProduct, findUser, newUser } from "./api"
import { productsInfo, userInfo } from "../types/types"

//============= Home Page =============
export const useProducts = (category:string)=>{
    return useQuery(
        { 
            queryKey: ['products'],
            queryFn: getProducts,
            select: (data)=> data.filter((item:productsInfo)=> category !== "All"? category === item.category?.name: item)         
        }
    )
}

//============= Product Details Page =============
export const useDetails = (id:string|undefined)=>{
  
  return useQuery({
    queryKey:["product", id],
    queryFn: ()=> getProductDetails(id),
    enabled: !!id   
    })
}

//============= get User ===============
export const useUser = (id:string)=>{
  return useQuery(
      { 
          queryKey: ['user', id],
          queryFn: ()=> getUser(id),
          enabled: !!id,
          
      }
  )
}
//============ Login ===================
export const useFindUser = ()=>{
    return useQuery(
        { 
            queryKey: ['loginUser'],
            queryFn: findUser
            
        }
    )
  }

// ============ Add new User =============
export const useNewUser = () =>{
    return useMutation({
        mutationFn: (userData:userInfo)=> newUser(userData),
    })
}

//============= Add Product ============
export const useAddProduct = () =>{
    return useMutation({
        mutationFn: ({id, items}: {id:string|undefined, items:userInfo})=> postProduct(id, items),
    
    })
}