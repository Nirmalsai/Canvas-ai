import axiosInstance from "../api/axiosInstance";
export async function uploadImage(imageData){
const response = await axiosInstance.post('/',JSON.stringify({
    imageData, 
  }), {
    headers: {
      "Content-Type": "application/json", 
    }})
    return response
};