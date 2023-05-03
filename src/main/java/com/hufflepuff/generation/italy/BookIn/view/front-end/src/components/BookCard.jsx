import { NavLink } from "react-router-dom";

export default function BookCard({ book }) {
   console.log(book)
   return (
      <div className="book-card">
         {/* <div className="card-book">
         <figure className="image is-1by1"> */}
         
         <h3 className="title">
            <NavLink to={`/books/${book.id}`}>
               {book.title}</NavLink>
         </h3>
         <NavLink to={`/books/${book.id}`}>
            <img src={`https://picsum.photos/seed/${book.id}/300/200`} alt="Book Cover" />
         </NavLink>
         
         {/* </figure>
         </div> */}
         <div className="card-content">
            <div className="media-content">
               {/* <h3 className="title">{book.title}</h3> */}
               <p>Data di pubblicazione: {book.year ||"N/S"}</p>
            </div>
            <div className="content">{book.review}</div>
         </div>
      </div>
   );
}