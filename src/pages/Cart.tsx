import {useEffect, useState } from "react"
import Nav from "../components/Nav"
import { cartInfo } from "../types/types"
import deleteIcon from '../assets/deleteIcon.png'
import Footer from "../components/Footer"
import loaderIcon from '../assets/Loadericon.svg'
import { useUser, useAddProduct } from "@/services/queries"
import 'react-toastify/dist/ReactToastify.css';
import { useQueryClient } from "@tanstack/react-query"


function Cart() {
  const [total, setTotal] = useState<number>(0)
  const [qtyValue, setQtyValue] = useState<{[idItem:string]: string}>({})
  const [deleteBox, setDeleteBox] =useState<string>("")
  const getUser = localStorage.getItem("userID") || ""
  const {data:userData, isLoading}= useUser(getUser)
  const {mutateAsync: removeItem} = useAddProduct()
  const query = useQueryClient()

  useEffect(()=>{
    getTotal()
    updateTotal()
  },[qtyValue, userData?.cartItem])

 
  const getTotal = () => { 
     let result:number = userData?.cartItem?.reduce(
        (accumulator:number, item:cartInfo) => accumulator + (item.qty*item.price),
        0,
      )?? 0;
  
      setTotal(result)  
  }

  const updateTotal = () =>{
      let result:number = userData?.cartItem?.reduce(
        (accumulator:number, item:cartInfo) => {
          let getNewQty = item.cartId && parseInt(qtyValue[item.cartId]) || item.qty
          return accumulator + (getNewQty*item.price)},
        0,
      )?? 0;
  
      setTotal(result)
   
  }
  
  const deleteByID = (itemID: string):void =>{
    setDeleteBox(itemID);
    
    (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()
  }

  const deleteItem = (selectedID:string):void =>{
    
      let newList = userData?.cartItem?.filter((item:cartInfo) => item.cartId !== selectedID)

      userData && removeItem({id:getUser, items:{...userData, cartItem: newList}},
        {
            onSuccess:()=>{
              query.invalidateQueries({queryKey:["user"]})
            },
        }
      )
  }

  if(isLoading){
    return ( 
        <section className="flex h-screen flex-col justify-center items-center">
        <img src={loaderIcon} className="w-8 h-7"></img>
        </section>
      )

  }
  return (
    <>
     
          <main>
            <Nav />
            <section className="max-sm:flex max-sm:flex-col h-screen">
            <section className="grid grid-cols-3 gap-x-8 py-6  max-sm:flex-grow lg:gap-x-10  max-sm:flex max-sm:flex-col max-sm:py-12 max-sm:px-6 px-10 lg:px-12">
              <section className="flex justify-center lg:col-span-2 max-sm:col-span-1 col-span-2 h-auto max-h-[60vh]  max-sm:h-auto max-sm:max-h-[50vh]  overflow-y-auto lg:h-[75vh]">
            {userData?.cartItem?.length ?(
               <table className="table-fixed h-fit w-full  border-[1.5px] shadow-lg border-gray rounded-md">
               <tr className="bg-gray-300">
                 <th>Image</th>
                 <th>Name</th>
                 <th>Size</th>
                 <th>Price</th>
                 <th >Qty</th>
                 <th>Delete</th>
                 
               </tr>
               {userData?.cartItem?.map((item,index)=>(
                 <tr key={index} className=" border-[1.5px] border-gray">
                   <td className="border border-white  flex justify-center text-wrap px-4 py-2 text-center max-sm:px-0"><img src={item?.images} className="max-sm:w-10 max-sm:h-16 w-[6rem] h-[6rem]"></img></td>
                   <td className="border border-white  text-wrap px-4 py-2 text-center max-sm:px-0" >{item.title}</td>
                   <td className="border border-white  text-wrap px-4 py-2 text-center max-sm:px-0">
                      {item.size? (item.size): "-"}
                   </td>
                   <td className="border border-white  text-wrap px-4 py-2 text-center max-sm:px-0">{item.price}</td>
                   <td className="border border-white  text-wrap px-4 py-2 text-center max-sm:px-0">
                      <select key={item.cartId} value={item.cartId? qtyValue[item.cartId] || item.qty: item.qty} onChange={(e)=>{setQtyValue((prev)=>({...prev, [item.cartId!]:e.target.value}))}} className="px-2 border-[1.2px] border-gray-400 rounded-md">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                      </select>
                   </td>
                   <td className="text-center">
                   <button className="btn m-auto bg-white border-none" onClick={()=> deleteByID(item.cartId!)}><img src={deleteIcon}  className='lg:w-4 w-4 cursor-pointer'></img></button> 
                   <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        
                        <p className="py-4">Are you sure you want to remove this Product?</p>
                        <div className="modal-action">
                        <form method="dialog" >
                            <button className="btn mx-2 bg-red-500 text-white " onClick={()=> deleteItem(deleteBox)}>yes</button>
                            <button className="btn">No</button>
      
                      </form>
                        </div>
                    </div>
                    </dialog>
                   </td>
                   </tr>
               ))}
               
             </table>
      
      
            ):(
              <p className="text-[1.2em] text-gray-500 font-semibold text-center py-6">There are No Products in Here</p>
            )}
               
              </section>
              <section className="flex lg:h-fit h-fit lg:py-4 px-2 rounded-md shadow-lg border-[1.2px] border-gray-300  flex-col max-ms:gap-y-3 max-sm:py-1 max-sm:mt-4  pb-2">
                
                    <p className="flex justify-between py-4 max-sm:pb-7 font-bold"> <span>Total:</span><span className="text-red-500">{total}$</span></p>
                    <button className="bg-[#6146cb] hover:bg-[#6141e0] rounded-sm py-1 text-white w-full">Checkout</button>
              
              </section>
      
            </section>
            </section>
          
           <Footer/>
          </main>
    
    </>
   
  )
}
export default Cart
