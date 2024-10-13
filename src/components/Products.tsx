import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Nav from "./Nav"
import { cartInfo } from "../types/types"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer"
import LoadingIcon from '../assets/loadingIcon.svg'
import loaderIcon from '../assets/Loadericon.svg'
import { useAddProduct, useDetails,useUser } from "@/services/queries"
import { useQueryClient } from "@tanstack/react-query"

function Products() {
  const {id} = useParams<{id:string|undefined}>()
  const [size, setSize] = useState<string>("")
  const [qty, setQty] = useState<number>(1)
  const [adding, setAdding]= useState<boolean>(false)
  const query = useQueryClient()
  
  const getUser = localStorage.getItem("userID") || ""
  const {data:userData}= useUser(getUser)
  const {data:productData, error:productError, isFetching} = useDetails(id)
  const {mutateAsync: newProduct, isPending:addingProduct} = useAddProduct()
  
  const addToCart = () =>{
      
        if(userData){ 

          let arr: cartInfo[] = []
          if((productData?.category?.name === "clothes" || productData?.category?.name === "shoes") && size){
          
              let checkSize = userData?.cartItem?.some((item: cartInfo)=>item.size === size && item.id === id)
              
              if(!checkSize){
                arr = [...(userData?.cartItem ?? [])]
                arr.push({
                  "cartId": String(arr.length+1),
                  "id":productData?.id,
                  "title": productData?.title,
                  "price": productData?.price,
                  "images": productData?.images,
                  "total": productData?.price * qty,
                  "qty": qty,
                  "size":size
                })
                  
                newProduct({id:getUser, items:{...userData, cartItem: arr}},
                  {
                      onSuccess:()=>{
                      
                          toast.success('The Product has been Added Successfuly 🎉', {
                          position: "top-right",
                          autoClose: 3500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light"
                          });
                          query.invalidateQueries({queryKey:["user"]})
                          setAdding(true)
                      },
                  }
                )
              }else{
                toast.error('The Product Already Exists', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light"
                  });
              }
            
            }else if(productData?.category?.name === "furniture"){
            
                let checkSize = userData?.cartItem?.some((item: cartInfo)=> item.title === productData?.title)
  
                if(!checkSize){
                  arr = [...(userData?.cartItem ?? [])] 

                  arr.push({
                      "cartId":String(arr.length+1),
                      "id":productData?.id,
                      "title": productData?.title,
                      "price": productData?.price,
                      "images": productData?.images,
                      "total": productData?.price * qty,
                      "qty": qty
                  })

                  newProduct({id:getUser, items:{...userData, cartItem: arr}},
                    {
                        onSuccess:()=>{
                            toast.success('The Product has been Added Successfuly 🎉', {
                            position: "top-right",
                            autoClose: 3500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                            });
                            query.invalidateQueries({queryKey:["user"]})
                            setAdding(true)

                        },
                    }
                  )
                }else{
                  toast.error('The Product Already Exists', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                    });

                }
               
            }else{
              toast.warn('Please Select your Size!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
                });
            }
          }  
            else{                    
              toast.warn(
                  <p>
                    You have to Login<Link to='/signin' className='text-blue-500 underline ml-1'>Here</Link> to Complete the Process            
                  </p>
                  , {
                    position: "top-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                    });
            }
 

  }
  
  if(addingProduct){
    
    setTimeout(()=>{
      setAdding(false)
   },5000)

  }
  
  if(isFetching){
    return ( 
        <section className="flex h-screen flex-col justify-center items-center">
        <img src={loaderIcon} className="w-8 h-7"></img>
        </section>
      )

  }
  if(productError){
    return (<p> There Are Some Errors</p>)
  }
 

  return (
    
        <main>
          <Nav/>
        
          <ToastContainer />
          <section className="flex items-center flex-col h-screen">
          <section className="grid   grid-cols-2  gap-x-6  max-sm:grid-cols-1 max-sm:px-6 px-10 max-sm:py-12 lg:px-12 lg:py-20 py-6">
    
             <section>
              <img src={productData?.images} className="lg:h-[25rem] lg:w-[95vh] h-[15rem] w-[95vw]"></img>
             </section>
             <section className="flex w-full flex-grow  flex-col h-full max-sm:gap-y-4 max-sm:py-8 lg:gap-y-4  gap-y-5">
              <h1 className="text-[2em] font-bold">{productData?.title}</h1>
              <p className="text-justify max-sm:text-[1.1em] text-[1.2em]">{productData?.description}</p>
    
              <section className="flex items-center flex-wrap gap-6 max-sm:mt-4">
                {productData?.category?.name === "clothes"  && 
                    <>
                   
                        <p className="font-bold  max-sm:text-[1.29em] text-[1.3em]">Size:</p>
                        <select className="w-fit px-4 border-[1.5px] lg:text-[1.1em] text-[1.1em] border-gray-300 rounded-sm py-1" value={size} onChange={(e)=>setSize(e.target.value)}>
                          <option value="" >Select Size</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                        </select>
                    </>
                
                }
                {productData?.category?.name === "shoes"  && 
                    <>
                   
                        <p className="font-bold  max-sm:text-[1.29em] text-[1.3em]">Size:</p>
                        <select className="w-fit px-4 border-[1.5px] lg:text-[1.1em] text-[1.1em] border-gray-300 rounded-sm py-1" value={size} onChange={(e)=>setSize(e.target.value)}>
                          <option value="" >Select Size</option>
                          <option value="36">36</option>
                          <option value="38">38</option>
                          <option value="40">40</option>
                        </select>
                    </>
                
                }
                <p className="font-bold max-sm:text-[1.29em] text-[1.3em]">Price: <span className="text-red-600 px-2">{(productData?.price?? 0)  * qty}$</span></p>  
    
              </section>
              <section className="flex gap-4 mt-2 max-sm:mt-4">
                <button className={`${!adding?"bg-[#6146cb] hover:bg-[#6141e0]":"bg-[#c5c5c5]"} max-sm:text-[1em] text-[1.2em] lg:text-[1.2em] py-2 max-sm:w-[60vw] w-[26vw] px-8 rounded-sm text-white max-ms:px-12`} disabled={adding} onClick={addToCart}>{adding? <span className="w-full flex gap-x-2 items-center justify-center">Adding <img src={LoadingIcon} className="w-5 h-5"></img></span>: "Add to Cart"}</button>
                <select className="w-fit px-4 border-[1.5px] border-gray-300 rounded-sm" value={qty} onChange={(e)=>setQty(parseInt(e.target.value))}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
    
              </section>
             </section>
          </section>
          </section>
         
          <Footer/>
        </main>
    
  )
}

export default Products