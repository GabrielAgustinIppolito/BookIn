import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function BookCard({book}) {

  const [isLoading, setLoading] = useState(true);
  const [link, setlink] = useState();
  // const apiKey = process.env.API_KEY;
  useEffect(  () => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`, {
      headers: {
        Authorization: `Client-ID ${(import.meta.env.VITE_API_KEY)}`,
      }
    }).then(response => {
      setlink(response.data);
      setLoading(false);
      console.log(response.data)
    });
    // result = await infoBookFromIsbn(book.isbn);
  }, []);

  useEffect(
    () => {
        if (!isLoading) {
          if (link.totalItems != 1) {
            book.imageUrl = "none";
          } else {
            if( link.items[0].volumeInfo.imageLinks){
              book.imageUrl = link.items[0].volumeInfo.imageLinks.thumbnail;
            } else {
              console.log(link.items[0]);
              book.imageUrl = "none";
            }
          }
        }
    }
    , [isLoading]);

  let cover = <figure>
  <img
    className="max-w-xs h-80 rounded-xl"
    
    src={(book.imageUrl && book.imageUrl != "none") ? book.imageUrl : "../src/assets/default_book_cover_2015.jpeg"}
    alt="Book Cover"
  />
</figure>;

  if (isLoading) {
    cover = <button className="btn loading">loading</button>
  }
  return (
    <div className="card card-side bg-base-200 max-w-screen-lg m-8 shadow-xl">
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
        <p>{book.available ? "Da scambiare" : "Già scambiato"}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Modifica</button>
          <button className="btn btn-error">Elimina</button>
        </div>
      </div>
    </div>
  );
}
