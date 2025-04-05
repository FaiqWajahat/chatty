import {create} from "zustand";

const useContactSidebar=create((set)=>({
    isOpen:false,

    setOpen:()=>{
        set({isOpen:true})
    }
  ,
    setClose:()=>{
        set({isOpen:false})
    }

}))

export default useContactSidebar;