
import {useRef, useState} from "react"
import { useEffect } from "react";

export default function Canvas(props) {
  const myRef=props.myRef;
  const [selectCords,setcSelectCords]=useState(null)
  const isDrawing=useRef(false);
  
  useEffect(()=>{
    const canvas=myRef.current;
    const ctx=canvas.getContext("2d");
    const parentDiv = canvas.parentElement;
    canvas.width = parentDiv.offsetWidth;  
    canvas.height = parentDiv.offsetHeight; 
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    const handleMouseDown=(e)=>{
      ctx.beginPath();
      
      isDrawing.current = true;
      ctx.moveTo(e.clientX-canvas.offsetLeft,e.clientY-canvas.offsetTop);
      
    }
    const handleMouseMove = (e) => {
      if (!isDrawing.current) return;
      else{
      ctx.lineTo(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop);
      ctx.stroke();
     
      }
    };
    const handleMouseUp=(e)=>{
      
      isDrawing.current = false;
    
      
    }
    //
    const handleMouseDownSel=(e)=>{
      setcSelectCords(()=>{return {...selectCords,startX:e.clientX-canvas.offsetLeft,startY:eclient-canvas.offsetTop}})
      
    }
   
    const handleMouseUpSel=(e)=>{
      
      setcSelectCords(()=>{return {...selectCords,endX:e.clientX-canvas.offsetLeft,endY:eclient-canvas.offsetTop}})
      canvas.removeEventListener("mousedown",handleMouseDownSel);
    canvas.removeEventListener("mouseup",handleMouseUpSel);
    props.setSelection(false)
      
    }
    
    if(!props.Selection){
    canvas.addEventListener("mousedown",handleMouseDown);
    canvas.addEventListener("mouseup",handleMouseUp);
    canvas.addEventListener("mousemove",handleMouseMove);
    }
    else{
      canvas.removeEventListener("mousedown",handleMouseDown);
    canvas.removeEventListener("mouseup",handleMouseUp);
    canvas.removeEventListener("mousemove",handleMouseMove);
      canvas.addEventListener("mousedown",handleMouseDownSel);
      canvas.addEventListener("mouseup",handleMouseUpSel)
    }
    
  },[])

  return (
    
    
      <canvas   className={"bg-yellow-100 border-2 border-gray-900 rounded-3xl h-full w-full"} ref={props.myRef}  ></canvas>
     )
}