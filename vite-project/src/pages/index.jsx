<<<<<<< HEAD
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
        <Button handleClick={handleClickRes} txt="solve" id="1"></Button>
       
        <Response txt={result} ></Response>
    </div>
    </div>
</div>
}
=======
import React, { useRef, useState } from "react";
import Logo from "@/components/logo/logo";
import Canvas from "@/components/canvas/canvas";
import Button from "@/components/button";
import Response from "@/components/response";
import HorizontalOptions from "@/components/options/options";
import { uploadImage } from "../services/index";

export default function MainPage() {
  const myRef = useRef(null);
  const [result, setResult] = useState("no response");
  const [Selection, setSelection] = useState(false);
  const [penSize, setPenSize] = useState(2);
  const [penColor, setPenColor] = useState("black");
  const [eraser, setEraser] = useState(false);
  const [selectionCoords, setSelectionCoords] = useState(null);

  const handleClickRes = async () => {
    try {
      const response = await uploadImage(myRef.current.toDataURL());
      if (response) setResult(response.data.result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlePenSizeChange = (size) => {
    setPenSize(size);
    setEraser(false);
  };

  const handleColorChange = (color) => {
    setPenColor(color);
    setEraser(false);
  };

  const handleEraserSelect = () => {
    setEraser(true);
  };


  const enableSelectionMode = () => {
    setSelection(true);
    setSelectionCoords(null);
  };


  const handleSelectionComplete = async (coords) => {
    if (!myRef.current) return;
    const { x, y, width, height } = coords;
    const canvas = myRef.current;

    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = width;
    croppedCanvas.height = height;
    const croppedCtx = croppedCanvas.getContext("2d");

    croppedCtx.drawImage(canvas, x, y, width, height, 0, 0, width, height);
    const dataURL = croppedCanvas.toDataURL("image/png");
    try {
      const response = await uploadImage(dataURL);
      if (response) setResult(response.data.result);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div>
        <Logo />
      </div>
      <HorizontalOptions
        onPenSizeChange={handlePenSizeChange}
        onColorChange={handleColorChange}
        onEraserSelect={handleEraserSelect}
      />
      <div className="flex gap-4 w-full h-full flex-grow">
        <div className="w-8/12 flex-grow relative">
          <Canvas
            myRef={myRef}
            Selection={Selection}
            setSelection={setSelection}
            penSize={penSize}
            color={penColor}
            eraser={eraser}
            setSelectionCoords={setSelectionCoords}
            onSelectionComplete={handleSelectionComplete}
          />
         
        </div>
        <div className="w-4/12 h-full">
          <Button handleClick={handleClickRes} txt="Solve" id="1" />
          <Button
                handleClick={enableSelectionMode}
                className="px-4 py-2 border rounded"
                txt='Crop & Solve'
              >

              </Button>
          <Response txt={result} />
        </div>
      </div>
    </div>
  );
}
>>>>>>> 796bd6a (added selection feature and pen sizes and colours)
