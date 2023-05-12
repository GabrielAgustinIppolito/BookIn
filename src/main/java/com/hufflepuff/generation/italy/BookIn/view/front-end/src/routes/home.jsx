import { getAllBooksFromUserCity } from "../apis/book-api";
import { useLoaderData } from "react-router-dom";
import PublicBookCard from "../components/PublicBookCard";

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
   return (
      <div className="flex flex-col items-center justify-center gap-5">
         <h1 className="my-titles text-3xl m-auto mt-5">Libri nella tua città</h1>
         <div className="grid gap-2 justify-center items-center mx-auto my-5 lg:grid-cols-2">
            {cardsToShow}
         </div>
      </div>
   );
}