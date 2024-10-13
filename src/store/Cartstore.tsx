import { create } from "zustand";

interface cartStore{
    itemLength:number,
    updateLength:(total:number)=> void
}

export const useCartState = create<cartStore>((set)=>({
    itemLength: 0,
    updateLength:  (total)=> set(()=> ({itemLength: total})),
}))

