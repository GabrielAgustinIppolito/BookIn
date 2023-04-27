import { useLoaderData } from "react-router-dom";
import { getBook } from "../apis/book-api";

export async function loader({ params }) {
  const book = await getBook(params.id);
  return { book };
}

export default function Book() {
  const book = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img
          key={book.id}
          src={book.front || "../assets/default_book_cover_2015.jpeg"}
        />
      </div>

      <div>
        <h1>{book.title ? <>{book.title}</> : <i>Nessun titolo</i>} </h1>
        <span>
          Autore:
          {book.author ? <>{book.author}</> : <i>Non specificato</i>}
        </span>
        <span>
          Editore:
          {book.publisher ? <>{book.publisher}</> : <i>Non specificato</i>}
        </span>
        <span>
          Anno:
          {book.year ? <>{book.year}</> : <i>Non specificato</i>}
        </span>
        {book.language && <p>{book.language}</p>}
        {book.review && <p>{book.review}</p>}
        <span>
          Shippable:
          {book.year ? (
            <>
              <i>True</i>
            </>
          ) : (
            <i>False</i>
          )}
        </span>

        <div></div>
      </div>
    </div>
  );
}
