import { useState } from "react"
import Cards from "./Cards"

function Categories() {

  let [selected, setSelected] = useState<string>("All")
  const allCategories: string[] = ["All", "clothes", "shoes", "furniture"]
  

  const getCategory = (categoryName: string):void=>{

    setSelected(categoryName)
  }
 
  return (
    <section className="flex flex-col max-sm:mt-6 mt-6">
        <section className="flex flex-wrap gap-y-2 gap-x-3 lg:px-12 px-10 max-sm:gap-x-2 max-sm:px-6">
            {allCategories?.map((item, index)=>(
                 
                  <button key={index} className={`text-center w-20  lg:w-24 py-[0.1rem] px-2  rounded-2xl max-sm:px-1 border-[1.1px] shadow-sm border-gray-300 max-sm:w-22 ${item === selected? 'bg-[#e3e3e2]': 'bg-gray'}`} onClick={()=> getCategory(item)}>{item}</button>        
            ))}
        </section>
        <section>
            <Cards selectedItem = {selected}/>
        </section>

      
    </section>
  )
}

export default Categories
