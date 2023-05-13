import { getAllBooksFromUserCity } from "../apis/book-api";
import { useLoaderData } from "react-router-dom";
import PublicBookCard from "../components/PublicBookCard";
import { useState } from "react";

{/*La home consisterà in una pagina con una lista dei primi 10 libri presenti
nella città dell'utente, mostrati come schede 
IMPLEMENTARE LA PAGINAZIONE!!!*/}

export async function loader() {
   const allBooks = await getAllBooksFromUserCity();
   return { allBooks };
}

export default function Home() {
   const { allBooks } = useLoaderData();
   const cardsToShow = allBooks.map((b) => (
      <PublicBookCard key={b.id} book={b}></PublicBookCard>
   ));
   const numItemsToShow = 2;
   const [actualPage, setActualPage] = useState(1);
   const [pagingCards, setPagingCards] = useState(cardsToShow.slice(0, numItemsToShow));

   const hasNextPage = () =>{
      if(actualPage * numItemsToShow < cardsToShow.length){
         return true;
      }
      return false;
   }

   const nextPage = () => {
      setPagingCards(cardsToShow.slice(actualPage * numItemsToShow , actualPage * numItemsToShow + numItemsToShow));
      setActualPage(actualPage + 1);
   }

   const previousPage = () => {
      setPagingCards(cardsToShow.slice((actualPage -2) * numItemsToShow, (actualPage -2)  * numItemsToShow + numItemsToShow));
      setActualPage(actualPage - 1);
   }

   return (
      <div className="flex flex-col items-center justify-center gap-5">
         <h1 className="my-titles text-3xl m-auto mt-5">Libri nella tua città</h1>
         <div className="grid gap-2 justify-center items-center mx-auto my-5 lg:grid-cols-2">
            {pagingCards}
         </div>
         <div>
            <div className="btn-group">
               {actualPage > 1 ?
                  <button className="btn" type="button" onClick={previousPage}>«</button> : ""}
               <button className="btn btn-disabled">{actualPage}</button>
               {hasNextPage() ?
                  <button className="btn" type="button" onClick={nextPage}>»</button> : ""}
            </div>
         </div>
      </div>
   );
}