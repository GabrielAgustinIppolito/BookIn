import { NavLink } from "react-router-dom";

export default function BookTable({ books }) {

    const bookRow = books.map(book => (
        <tr key={book.id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={
                            book.imageUrl && book.imageUrl != "none"
                              ? book.imageUrl
                              : "../src/assets/default_book_cover_2015.jpeg"
                          }
                        loading="lazy"
                        alt={`Copertina di ${book.title}`}
                      />
                    </div>
                  </div>
                  <div>
                    <NavLink to={`/books/${book.id}`}>
                        <div className="font-bold">{book.title ? book.title : "Nessun titolo"}</div>
                    </NavLink>
                    
                  </div>
                </div>
              </td>
              <td>
              {book.author ? book.author : "Non specificato"}
                
              </td>
              <td>
              {book.publisher ? book.publisher : "Non specificato"}
              </td>
              
            </tr>
           
    ));

  return (
    <>
      <div className="overflow-x-auto w-full my-10">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Titolo</th>
              <th>Autore</th>
              <th>Editore</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bookRow}
          </tbody>
        </table>
      </div>
    </>
  );
}
