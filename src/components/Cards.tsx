import { Link } from "react-router-dom"
import { useProducts } from "@/services/queries"

function Cards({selectedItem}: {selectedItem:string}) {
  const {data} = useProducts(selectedItem)

  return (
    <section className="max-sm:mt-4 mt-10 flex justify-center">
      <section className="grid w-full max-sm:grid-cols-2 lg:grid-cols-4 grid-cols-3 gap-x-3 gap-y-4 lg:gap-y-6 lg:px-12 px-10 max-sm:gap-x-3 max-sm:gap-y-4 max-sm:px-6">
       {data?.map((product, index)=>(
        <section className="flex flex-col lg:h-fit  rounded-md  shadow-md" key={index}>

         <img src={product.images[0]} className="max-sm:h-[12vh] lg:h-[13rem] h-[24vh] rounded-t-md"></img>
         <section className="flex py-4 lg:py-5 px-2 flex-wrap justify-between">
            <p className="">{product.title}</p>
            <p>{product.price} $</p>
         </section>
         
         <section className="px-2 pb-2">
          <Link to={`/product/${product.id}`}>
              <button className="bg-[#6146cb] hover:bg-[#6141e0] rounded-sm py-1 text-white w-full">Product Details</button>
          </Link>
         </section>
         
        </section>
       ))}
       
      </section>
      
    </section>
  )
}

export default Cards
