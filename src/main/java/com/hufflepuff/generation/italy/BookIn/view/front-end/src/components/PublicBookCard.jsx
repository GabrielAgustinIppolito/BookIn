import { NavLink } from "react-router-dom";

export default function PublicBookCard({ book }) {
  return (
    <div className={`card card-side bg-accent max-w-screen-lg m-8 shadow-xl
                    ${ !book.available && "opacity-50 "}`}>
      <NavLink to={`/books/${book.id}`}>
        <figure>
          <img
            className="max-w-xs h-80 rounded-xl"
            src={`http://1.bp.blogspot.com/-Z0ePnWNTVuQ/VK3fouq-XBI/AAAAAAAAC0I/KdnHXLax8bg/s1600/PLDC0729.JPG`}
            alt="Book Cover"
          />
        </figure>
      </NavLink>
      <div className="card-body">
        <NavLink to={`/books/${book.id}`}>
          <h2 className="card-title">{book.title}</h2>
        </NavLink>
        <p>Autore: {book.author || "N/S"}</p>
        <p>Editore: {book.publisher || "N/S"}</p>
        <p>Anno di pubblicazione: {book.year || "N/S"}</p>
        <p>{ book.available ? "🟢Disponibile🟢" : "🔴Non più disponibile🔴"}</p>
      </div>
    </div>
  );
}
