import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { NavLink, Form, useLoaderData } from "react-router-dom";
import { getAllBooksFromUserCity, getBooksByGenre, getBooksByTag, getGenres, getTags, getUserCityPosix } from "../apis/book-api";

export async function loader() {
   const tags = await getTags();
   const genres = await getGenres();
   const userCityPosix = await getUserCityPosix();
   const allBooks = await getAllBooksFromUserCity();
   console.log(allBooks);
   return { tags, genres, userCityPosix, allBooks };
}

export default function Search() {
   const { tags, genres, userCityPosix, allBooks } = useLoaderData();
   const [booksToShow, setBooksToShow] = useState([...allBooks]);

   const optionedGenres = genres.map((genre) => (
      <option key={genre.id} value={genre.id}>
         {genre.name}
      </option>
   ));

   const optionedTags = tags.map((tag) => (
      <option key={tag.id} value={tag.id}>
         {tag.name}
      </option>
   ));

   const handleChangingSelect = async (e) => {
      console.log(e.target.id);
      let books;
      if (e.target.id === "genres") books = await getBooksByGenre(e.target.value);
      if (e.target.id === "tags") books = await getBooksByTag(e.target.value);
      if (books == 404) {
         setBooksToShow([]);
      } else {
         console.log(books);
         setBooksToShow([...books]);
      }
   };

   const handleChange = (e) => {
      const arrSupporto = [];
      for (let i = 0; i < booksToShow.length; i++) {
         if (booksToShow[i].title.includes(e.target.value)) {
            arrSupporto.push(booksToShow[i]);
         }
      }
      if (arrSupporto.length === 0) {
         setBooksToShow([]);
      } else {
         setBooksToShow([...arrSupporto]);
      }
      if (e.target.value == "") {
         setBooksToShow([...allBooks]);
         let selectGenre = document.getElementById("genres");
         selectGenre.selected = selectGenre.firstChild;
         console.log(selectGenre.selected.value);
         let selectTags = document.getElementById("tags");
         selectTags.selected = selectTags.firstChild;
      }
   }

   return (
      <>
         <div className="flex flex-col justify-between items-center m-auto">
         <h1 className="my-titles text-4xl m-auto my-8">Ricerca libri nella tua città!</h1>
            <div className="flex justify-between items-center w-5/6 mb-8">
               <Form method="get">
                  <div className="form-control">
                     <div className="input-group">
                        <input
                           type="text"
                           placeholder="Cerca per titolo"
                           className="input input-bordered"
                           onChange={handleChange}
                           onSubmit={e => e.preventDefault()}
                        />
                        <button className="btn btn-square"
                           type="submit"
                           onSubmit={e => e.preventDefault()}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                           </svg>
                        </button>
                     </div>
                  </div>
               </Form>
               <select
                  onChange={handleChangingSelect}
                  name="genres"
                  id="genres"
                  className="select select-bordered w-full max-w-xs"
               >
                  <option disabled selected>
                     Generi
                  </option>
                  {optionedGenres}
               </select>
               <select
                  onChange={handleChangingSelect}
                  name="tags"
                  id="tags"
                  className="select select-bordered w-full max-w-xs"
               >
                  <option disabled selected>
                     Tags
                  </option>
                  {optionedTags}
               </select>
            </div>
            <MapContainer
               center={[userCityPosix.longitude, userCityPosix.latitude]}
               zoom={13}
               scrollWheelZoom={false}
               style={{ height: "500px", width: "90%", overflow: "hidden", borderRadius: "25px" }}
               className="shadow-2xl"
            >
               <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               {booksToShow.length != 0
                  ? booksToShow.map((book) => (
                     <Marker
                        key={book.id}
                        position={
                           book.longitude && book.latitude
                              ? [book.longitude, book.latitude]
                              : [userCityPosix.longitude, userCityPosix.latitude]
                        }
                     >
                        <Popup>
                           {book.title}, {book.author}
                           <NavLink to={`/public-profile/${book.ownerId}`}>
                              Contattami!
                           </NavLink>
                        </Popup>
                     </Marker>
                  ))
                  : null}
            </MapContainer>
            <ul>
               {booksToShow.map((book) => <li>{book.title}</li>)}
            </ul>
         </div>
      </>
   );
}
