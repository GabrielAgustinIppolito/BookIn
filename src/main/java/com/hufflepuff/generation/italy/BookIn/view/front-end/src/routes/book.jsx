import { useLoaderData } from "react-router-dom";
import { getBook, getBookOwner } from "../apis/book-api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";

export async function loader({ params }) {
  const book = await getBook(params.id);
  const ownerId = await getBookOwner(book.ownerId)
  return { book, ownerId };
}

export default function Book() {
  const {book, ownerId} = useLoaderData();

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
        
          <MapContainer
            center={[38.1102, 13.3752]}
            zoom={12}
            scrollWheelZoom={false}
            style={{height:'400px',}}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              <Marker
                position={[book.latitude, book.longitude]}
                >
                  {console.log(book)}
                  <Popup>{book.title}, {book.author}
                    {console.log(ownerId)}
                  </Popup>
              </Marker>
          </MapContainer>
        
      </div>
    </div>
  );
}
