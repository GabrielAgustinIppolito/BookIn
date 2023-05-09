import { useLoaderData, NavLink } from "react-router-dom";
import { getBook, getBookOwner } from "../apis/book-api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import { infoBookFromIsbn } from "../apis/google-api";

export async function loader({ params }) {
  const book = await getBook(params.id);
  const owner = await getBookOwner(book.ownerId);
  const link = await infoBookFromIsbn(book.isbn);
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
  return { book, owner };
}

export default function Book() {
  const { book, owner } = useLoaderData();

  return (
    <>
      <div className="py-6 sm:py-8 lg:py-12">
        <div className="mx-auto p-20 max-w-screen-xl px-4 md:px-8">
          <div className="flex flex-col gap-8">
            <div className="flex justify-start items-center gap-8">
              <div className="flex flex-col gap-4 relative rounded-lg bg-base-100 h-min w-48">
                <img
                  src={
                    book.imageUrl && book.imageUrl != "none"
                      ? book.imageUrl
                      : "../src/assets/default_book_cover_2015.jpeg"
                  }
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />

                <p>
                  {book.review ? " " + book.review : <i>Nessuna recensione</i>}
                </p>
              </div>
              <div className="md:py-8">
                <div className="mb-2 md:mb-3">
                  <span className="mb-0.5 inline-block text-gray-500">
                    {book.author ? " " + book.author : <i> Non specificato</i>}
                  </span>
                  <h2 className="my-titles text-2xl font-bold text-gray-800 lg:text-3xl">
                    {book.title ? book.title : <i> Nessun titolo</i>}
                  </h2>
                </div>

                <div className="flex flex-col items-start my-8 gap-2">
                  <span className="text-lg font-semibold text-gray-500">
                    Editore:{" "}
                    <span className="font-normal">
                      {book.publisher ? book.publisher : <i>Non specificato</i>}
                    </span>
                  </span>
                  <span className="text-lg font-semibold text-gray-500">
                    Anno di pubblicazione:{" "}
                    <span className="font-normal">
                      {book.year ? book.year : <i>Non specificato</i>}
                    </span>
                  </span>
                  <span className="text-sm text-gray-500">
                    ISBN: {book.isbn ? book.isbn : <i>Non specificato</i>}{" "}
                  </span>
                  <div className="mb-6 flex items-center gap-2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                      />
                    </svg>

                    <span className="text-sm">
                      {book.available ? (
                        book.shippable ? (
                          <p>Disponibile alla spedizione</p>
                        ) : (
                          <p>Spedizione non disponibile</p>
                        )
                      ) : (
                        <p>Non è più disponibile allo scambio.</p>
                      )}
                    </span>
                  </div>
                </div>
              <NavLink to={`/public-profile/${owner.id}`}>
                  <button
                    className="btn btn-primary rounded-lg text-white transition duration-100 hover:bg-secondary active:bg-secondary sm:flex-none"
                  >
                    Scambia questo libro!
                    </button>
                </NavLink>
              </div>
            </div>
            <MapContainer
              center={[book.latitude, book.longitude]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "400px" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[book.latitude, book.longitude]}>
                <Popup>
                  <ul>
                    <li>{book.title}</li>
                    <li>{book.author}</li>
                    <li></li>
                  </ul>
                  <NavLink to={`/public-profile/${owner.id}`}>
                    Contattami!
                  </NavLink>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}
