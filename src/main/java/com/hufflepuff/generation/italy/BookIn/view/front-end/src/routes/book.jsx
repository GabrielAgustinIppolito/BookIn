import { useLoaderData } from "react-router-dom";
import { getBook } from "../apis/book-api";

export async function loader({ params }) {
  const book = await getBook(params.id);
  return { book };
}

export default function Book() {
  const {book} = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img
          key={book.id}
          
          src={book.front || "/src/assets/default_book_cover_2015.jpeg"}
        />
      </div>

      <div>
        <h1>{book.title ? book.title : <i> Nessun titolo</i>} </h1>
        <p>
          Autore: 
          {book.author ? " " + book.author : <i> Non specificato</i>}
        </p>
        <p>
          Editore: 
          {book.publisher ? " " +  book.publisher : <i> Non specificato</i>}
        </p>
        <p>
          Anno:   
          {book.year ? " " +  book.year : <i> Non specificato</i>}
        </p>
        {book.language && <p>Lingua: {book.language}</p>}
        {book.review && <p>Recensione: {book.review}</p>}
        <p>
          Disponibile alla spedizione:
          {book.shippable ? 
            <i>🟢👍🟢</i>
           : 
            <i>🔴👎🔴</i>
          }
        </p>

        <div></div>
      </div>
    </div>
  );
}
