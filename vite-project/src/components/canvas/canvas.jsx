<<<<<<< HEAD

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
=======
import { useRef, useEffect } from "react";

export default function Canvas(props) {
  const {
    myRef,
    penSize,
    color,
    eraser,
    Selection,
    setSelection,
    setSelectionCoords,
    onSelectionComplete,
  } = props;

  const isDrawing = useRef(false);
  const isSelecting = useRef(false);
  const selectionStart = useRef({ x: 0, y: 0 });
  const originalImage = useRef(null);


  const penSettingsRef = useRef({ penSize, color, eraser });
  useEffect(() => {
    penSettingsRef.current = { penSize, color, eraser };
  }, [penSize, color, eraser]);


  useEffect(() => {
    const canvas = myRef.current;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas.parentElement.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [myRef]);


  useEffect(() => {
    const canvas = myRef.current;
    const ctx = canvas.getContext("2d");

    const getCanvasCoordinates = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };


    const handleMouseDown = (e) => {
      ctx.beginPath();
      isDrawing.current = true;
      ctx.lineWidth = penSettingsRef.current.penSize;
      ctx.strokeStyle = penSettingsRef.current.eraser
        ? "white"
        : penSettingsRef.current.color;
      const { x, y } = getCanvasCoordinates(e);
      ctx.moveTo(x, y);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing.current) return;
      const { x, y } = getCanvasCoordinates(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
    };


    const handleSelectionMouseDown = (e) => {
      isSelecting.current = true;
      const { x, y } = getCanvasCoordinates(e);
      selectionStart.current = { x, y };

      originalImage.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };

    const handleSelectionMouseMove = (e) => {
      if (!isSelecting.current) return;
      const { x, y } = getCanvasCoordinates(e);

      ctx.putImageData(originalImage.current, 0, 0);
      const rectX = Math.min(x, selectionStart.current.x);
      const rectY = Math.min(y, selectionStart.current.y);
      const rectWidth = Math.abs(x - selectionStart.current.x);
      const rectHeight = Math.abs(y - selectionStart.current.y);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6]);
      ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
      ctx.setLineDash([]);
    };

    const handleSelectionMouseUp = (e) => {
  if (!isSelecting.current) return;
  isSelecting.current = false;

  ctx.putImageData(originalImage.current, 0, 0);
  const { x, y } = getCanvasCoordinates(e);
  const rectX = Math.min(x, selectionStart.current.x);
  const rectY = Math.min(y, selectionStart.current.y);
  const rectWidth = Math.abs(x - selectionStart.current.x);
  const rectHeight = Math.abs(y - selectionStart.current.y);
  if (setSelectionCoords) {
    setSelectionCoords({ x: rectX, y: rectY, width: rectWidth, height: rectHeight });
  }
  if (onSelectionComplete) {
    onSelectionComplete({ x: rectX, y: rectY, width: rectWidth, height: rectHeight });
  }

  setSelection(false);
};



    if (!Selection) {
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
    } else {
      canvas.addEventListener("mousedown", handleSelectionMouseDown);
      canvas.addEventListener("mousemove", handleSelectionMouseMove);
      canvas.addEventListener("mouseup", handleSelectionMouseUp);
    }

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousedown", handleSelectionMouseDown);
      canvas.removeEventListener("mousemove", handleSelectionMouseMove);
      canvas.removeEventListener("mouseup", handleSelectionMouseUp);
    };
  }, [Selection, myRef, setSelection, setSelectionCoords, onSelectionComplete]);

  return (
    <canvas
      className="bg-yellow-100 border-2 border-gray-900 rounded-3xl h-full w-full"
      ref={myRef}
    ></canvas>
  );
}
>>>>>>> 796bd6a (added selection feature and pen sizes and colours)
