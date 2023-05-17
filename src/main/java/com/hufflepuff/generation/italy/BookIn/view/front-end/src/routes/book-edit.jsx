import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { getBook, updateBook } from "../apis/book-api";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { infoBookFromIsbn } from "../apis/google-api";
import { useEffect, useMemo, useRef, useState } from "react";

// CompleteBookDto format -> bookDto + splitted location
let globalBook;

export async function loader({ params }) {
   const book = await getBook(params.id);
   const link = await infoBookFromIsbn(book.isbn);
   if (link.totalItems != 1) {
      book.imageUrl = "none";
   } else {
      if (link.items[0].volumeInfo.imageLinks) {
         book.imageUrl = link.items[0].volumeInfo.imageLinks.thumbnail;
      } else {
         book.imageUrl = "none";
      }
   }
   return { book };
}

export const action = async ({ request }) => {
   const formData = await request.formData();
   const bookAllData = Object.fromEntries(formData);
   //bookWrapper format
   const bookWrapper = {
      "bookDto": {
         "id": globalBook.id,
         "title": bookAllData.title ? bookAllData.title 
                                    : globalBook.title ? globalBook.title 
                                                       : "titolo non trovato",
         "isbn": bookAllData.isbn,
         "year": bookAllData.year,
         "publisher": bookAllData.publisher,
         "language": bookAllData.language,
         "author": bookAllData.author,
         "isShippable": bookAllData.isShippable,
         "review": bookAllData.review,
         "isAvailable": globalBook.available,
      },
      "genresDto": null,
      "tagsDto": null,
      "location": {
         "id": globalBook.locationId,
         "longitude": globalBook.longitude,
         "latitude": globalBook.latitude
      }
   }
   await updateBook(bookWrapper);
   return redirect("/profile");
};

export default function BookEdit() {
   const [book, setBook] = useState(useLoaderData().book);
   const [isAvailableStatus, setAvailableStatus] = useState(book.available);
   const [position, setPosition] = useState([book.latitude, book.longitude]);
   const markerRef = useRef(null);
   const navigate = useNavigate();
   globalBook = book;

   const eventHandlers = useMemo(
      () => ({
         dragend() {
            const marker = markerRef.current
            if (marker != null) {
               setPosition([marker.getLatLng().lat.toFixed(4), marker.getLatLng().lng.toFixed(4),]);
            }
         },
      }),
      [],
   )

   const displayMap = useMemo(() => (
      <>
         <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '400px', width: '90%', overflow: 'hidden' }}
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
               draggable='true'
               eventHandlers={eventHandlers}
               position={position.longitude ? [position.latitude, position.longitude] : position}
               ref={markerRef}
            >
               <Popup minWidth={90}>
                  <p>Piazzami qui!</p>
               </Popup>
            </Marker>
         </MapContainer>
      </>
   ), [eventHandlers, position]);

   const handleInputChange = (e) => {
 
         console.log(e.target.className.baseVal);
         console.log(e.target.tagName);

      let inputCampName = e.target.name;
      const insertedValue = e.target.value;
      if(e.target.className.baseVal === 'isAvailableButton'){
         inputCampName = 'isAvailable';
      }
      switch (inputCampName) {
         case "title":
            setBook({ ...book, title: insertedValue });
            break;
         case 'author':
            setBook({ ...book, author: insertedValue });
            break;
         case 'publisher':
            setBook({ ...book, publisher: insertedValue });
            break;
         case 'isbn':
            setBook({ ...book, isbn: insertedValue });
            break;
         case 'review':
            setBook({ ...book, review: insertedValue });
            break;
         case 'year':
            setBook({ ...book, year: insertedValue });
            break;
         case 'shippable':
            setBook({ ...book, shippable: !book.shippable });
            break;
         case 'isAvailable':
            setBook({ ...book, available: !book.available });
            setAvailableStatus(!isAvailableStatus);
            globalBook.available = !globalBook.available;
            break;
      }
   }

   useState(globalBook = book, [book]);
   useEffect(
      () => {
         globalBook.longitude = position[1];
         globalBook.latitude = position[0];
      }, [position]);

   console.log(globalBook);

   return (<>
      <Form method="put" className="py-6 sm:py-8 lg:py-12">
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
                        className="h-full w-full object-cover object-center" />
                     <div className="collapse">
                        <input type="checkbox" />
                        <p className="collapse-title">
                           {book.review ? "Recensione: " + book.review : <i>Nessuna recensione</i>}
                        </p>
                        <div className="collapse-content">
                           <textarea name="review"
                              onChange={handleInputChange}
                              rows="3" cols="80"
                              className="textarea textarea-accent w-full max-w-xs"
                              maxLength="250"
                              placeholder={book.review ? book.review : "Nessuna recensione"} />
                        </div>
                     </div>
                  </div>
                  <div className="md:py-8">
                     <div className="mb-2 md:mb-3">
                        <div className="collapse">
                           <input type="checkbox" />
                           <span className="collapse-title mb-0.5 inline-block text-gray-500">
                              {book.author ? " " + book.author : <i> Non specificato</i>}
                           </span>
                           <div className="collapse-content">
                              <input type="text" name="author" onChange={handleInputChange} className="input input-bordered shadow-inner w-full max-w-xs" />
                           </div>
                        </div>
                        <div className="collapse">
                           <input type="checkbox" />
                           <h2 className="collapse-title my-titles text-2xl font-bold text-gray-800 lg:text-3xl">
                              {book.title ? book.title : <i> Nessun titolo</i>}
                           </h2>
                           <div className="collapse-content">
                              <input type="text" name="title" onChange={handleInputChange} className="input input-bordered shadow-inner w-full max-w-xs" />
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col items-start my-8 gap-2">
                        <div className="collapse">
                           <input type="checkbox" />
                           <span className="text-lg font-semibold text-gray-500 collapse-title">
                              Editore:{" "}
                              <span className=" font-normal">
                                 {book.publisher ? book.publisher : <i>Non specificato</i>}
                              </span>
                           </span>
                           <div className="collapse-content">
                              <input type="text" name="publisher" onChange={handleInputChange} className="input input-bordered shadow-inner w-full max-w-xs" />
                           </div>
                        </div>

                        <div className="collapse">
                           <input type="checkbox" />
                           <span className="text-lg font-semibold text-gray-500 collapse-title">
                              Anno di pubblicazione:{" "}
                              <span className="font-normal">
                                 {book.year ? book.year : <i>Non specificato</i>}
                              </span>
                           </span>
                           <div className="collapse-content">
                              <input type="date" name="year" onChange={handleInputChange} className="input input-bordered shadow-inner w-full max-w-xs" />
                           </div>
                        </div>

                        <div className="collapse">
                           <input type="checkbox" />
                           <span className="text-sm text-gray-500 collapse-title">
                              ISBN: {book.isbn ? book.isbn : <i>Non specificato</i>}{" "}
                           </span>
                           <div className="collapse-content">
                              <input type="text" name="isbn" onChange={handleInputChange} maxLength="13" className="input input-bordered shadow-inner w-full max-w-xs" />
                           </div>
                        </div>

                        <div className="collapse ">
                           <input type="checkbox" />
                           <div className="collapse-title  mb-6 flex items-center gap-2 text-gray-500 ">
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
                                       <i>Disponibile alla spedizione</i>
                                    ) : (
                                       <i>Spedizione non disponibile</i>
                                    )
                                 ) : (
                                    <i>Non è più disponibile allo scambio.</i>
                                 )}
                              </span>
                           </div>
                           <div className="collapse-content">
                              <input type="checkbox"
                                 name="shippable"
                                 className="checkbox checkbox-accent"
                                 defaultChecked={book.shippable}
                                 onChange={handleInputChange}
                              />
                           </div>
                        </div>
                     </div>
                  <button name="isAvailable"
                             value={isAvailableStatus}
                             type="button" 
                             onClick={handleInputChange}
                             className={`btn gap-2 ${isAvailableStatus ? "btn-secondary" : "btn-error"}`}>
                                 {isAvailableStatus ? <>
                                 Disponibile
                                 <svg className="isAvailableButton"  name="isAvailable" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path className="isAvailableButton" d="M21 3h-7a2.98 2.98 0 0 0-2 .78A2.98 2.98 0 0 0 10 3H3a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h5.758c.526 0 1.042.214 1.414.586l1.121 1.121c.009.009.021.012.03.021.086.079.182.149.294.196h.002a.996.996 0 0 0 .762 0h.002c.112-.047.208-.117.294-.196.009-.009.021-.012.03-.021l1.121-1.121A2.015 2.015 0 0 1 15.242 20H21a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.758 18H4V5h6c.552 0 1 .449 1 1v12.689A4.032 4.032 0 0 0 8.758 18zM20 18h-4.758c-.799 0-1.584.246-2.242.689V6c0-.551.448-1 1-1h6v13z"></path></svg></>
                              : <>
                                 Non Disponibile 
                                 <svg className="isAvailableButton"name="isAvailable" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path className="isAvailableButton" d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1zM8 6h9v2H8V6z"></path></svg></>}
                     </button>                     
               </div>
            </div>
            {displayMap}
            <div className="form-control flex-row gap-8 justify-center">
               <button type="button" class="btn btn-outline btn-error"
                  onClick={() => { navigate(-1); }}>
                  Anulla</button>
               <button class="btn btn-outline btn-primary ">Salva</button>
            </div>
         </div>
      </div>
   </Form >
   </>);
}