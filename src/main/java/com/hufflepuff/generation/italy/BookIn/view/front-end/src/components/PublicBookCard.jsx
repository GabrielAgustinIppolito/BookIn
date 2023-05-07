import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function PublicBookCard({ book }) {
  const [isLoading, setLoading] = useState(true);
  const [link, setlink] = useState();

  useEffect(() => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`, {
      headers: {
        Authorization: `Client-ID ${(import.meta.env.VITE_API_KEY)}`,
      }
    }).then(response => {
      setlink(response.data);
      setLoading(false);
    });
  }, [book]);

  useEffect(
    () => {
      if (!isLoading) {
        if (link.totalItems != 1) {
          book.imageUrl = "none";
        } else {
          book.imageUrl = link.items[0].volumeInfo.imageLinks.thumbnail;
        }
      }
    }
    , [isLoading, book, link]);

  let cover =
    <figure>
      <img
        className="max-w-xs h-80 rounded-xl"
        src={(book.imageUrl && book.imageUrl != "none") ? book.imageUrl : "../src/assets/default_book_cover_2015.jpeg"}
        alt="Book Cover"
      />
    </figure>;

  if (isLoading) {
    cover = <button className="btn loading max-w-xs h-80 rounded-xl">***Loading***</button>
  }

  return (
    <div className={`card card-side bg-base-200 max-w-screen-lg m-8 shadow-xl
                    ${!book.available && "opacity-50 "}`}>
      <NavLink to={`/books/${book.id}`}>
        {cover}
      </NavLink>
      <div className="card-body">
        <NavLink to={`/books/${book.id}`}>
          <h2 className="card-title hover:text-accent active:text-warning">{book.title}</h2>
        </NavLink>
        <p>Autore: {book.author || "N/S"}</p>
        <p>Editore: {book.publisher || "N/S"}</p>
        <p>Anno di pubblicazione: {book.year || "N/S"}</p>
        <p>{book.available ? "🟢Disponibile🟢" : "🔴Non più disponibile🔴"}</p>
      </div>
    </div>
  );
}
