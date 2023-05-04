import { useLoaderData, NavLink  } from "react-router-dom";
import { getBook, getBookOwner } from "../apis/book-api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";

export async function loader({ params }) {
  const book = await getBook(params.id);
  const owner = await getBookOwner(book.ownerId)
  return { book, owner };
}

export default function Book() {
  const {book, owner} = useLoaderData();

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
       
          {book.available ? `Disponibile alla spedizione:
            ${book.shippable ? 
              "<p>🟢👍🟢</p>"
             : 
             "<p>🔴👎🔴</p>"
            }` 
            :
           <h2>"Non è più disponibile allo scambio."</h2>
          }
          
        
        
          <MapContainer
          
            center={[book.longitude, book.latitude]}
            zoom={13}
            scrollWheelZoom={false}
            style={{height:'400px',}}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {console.log(book.latitude)}
              <Marker
                position={[book.longitude, book.latitude]}
                >
                  {console.log(book)}
                  <Popup>
                    {book.title}, {book.author}
                    {console.log(owner.id)}
                    <NavLink to={`/public-profile/${owner.id}`} >Contattami!</NavLink>
                  </Popup>
              </Marker>
          </MapContainer>
        
      </div>
    </div>
  );
}
