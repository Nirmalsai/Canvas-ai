import Logo from "@/components/logo/logo"
import Canvas from "@/components/canvas/canvas"
import { useRef, useState } from "react"
import  Button  from "@/components/button";
import  Response  from "@/components/response";
import { uploadImage } from "../services/index";
export default function mainPage(){
const myRef=useRef(null);
const [result,setResult]=useState("no response");
const [Selection,SetSelection]=useState(false)
const handleClickRes=async()=>{
    
    try{
      
    const response=await uploadImage(myRef.current.toDataURL());
    if(response)
    setResult(response.data.result)
   
    }
    catch{
      console.log("error")
    }
  }
const handleClickSel=()=>{
SetSelection(true);
}
return <div className="flex flex-col   w-full h-screen ">
   <div><Logo></Logo></div> 
    <div className="flex gap-4 w-full  h-full flex-grow">
    <div className="w-8/12 flex-grow">     
        <Canvas myRef={myRef} selection={Selection} setSelection={SetSelection}></Canvas>
    </div>
    <div className="w-4/12 h-full ">
        <Button handleClick={handleClickRes} ></Button>
        <Button handleClick={handleClickSel} ></Button>
        <Response txt={result} ></Response>
    </div>
    </div>
</div>
}