import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import  "dotenv/config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const YOUR_API_KEY=process.env.Gemini_Api_key

const genAi = new GoogleGenerativeAI(YOUR_API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
const app=express();
const port =process.env.PORT;
app.use(cors({origin:process.env.CLIENT_URL,methods:['GET','POST'],allowedHeaders: ['Content-Type'],}))
app.use(bodyParser.json())
app.post("/",(req,res)=>{
    const imageData=req.body.imageData;
    console.log(imageData);
    const base64ImageData = imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    if(!imageData){
        console.log("image data does not exist");
        
        return res.status(400).send({ message: "No image provided" });
    }
    try{
        const prompt = "analyze the picture and give an answer or check if the answer is correct ";
        const image = {
                inlineData: {
                     data: base64ImageData,
                    mimeType: "image/png",
                    },
                };

        async function generateText() {
            const response = await model.generateContent( [prompt,image] );
            
            let txt=await response.response.text();
            console.log(txt)
            return res.status(200).json({message:"query sucessful",
                result:txt});
            
          }
          generateText()
          
    }
    catch{
        console.log("error occured on sending image to gemini")
    }
})
app.listen(port,()=>{
    console.log(`listening through port ${port} `)
})