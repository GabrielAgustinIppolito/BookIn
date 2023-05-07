import axios from "axios";

export const infoBookFromIsbn = 
async(isbn) => {
   try {
     const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`, {
      headers: {
         Authorization: `Client-ID ${(import.meta.env.VITE_API_KEY)}`,
      }});
       return response.data;
   } catch (error) {
     return error.response;
   }
 }