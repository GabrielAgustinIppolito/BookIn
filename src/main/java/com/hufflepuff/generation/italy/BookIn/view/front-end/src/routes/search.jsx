import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { NavLink, useLoaderData } from "react-router-dom";
import { getBooksByGenre, getBooksByTag } from "../apis/book-api";

export default function Search() {
   const { tags, genres, userCityPosix } = useLoaderData();

   const [booksToShow, setBooksToShow] = useState([]);

   const optionedGenres = genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>);
   const optionedTags = tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>);

   const handleChangingSelect = async (e) => {
      console.log(e.target.id);
      let books;
      if(e.target.id === "genres") books = await getBooksByGenre(e.target.value);
      if (e.target.id === "tags") books = await getBooksByTag(e.target.value);
      if(books == 404){
         setBooksToShow([]);
      } else {
         console.log(books);
         setBooksToShow([...books]);
      }
   };

   return (
      <>
         <div>
            <select onChange={handleChangingSelect} name="genres" id="genres" className="select select-bordered w-full max-w-xs">
               <option disabled selected>Generi</option>
               {optionedGenres}
            </select>
            <select onChange={handleChangingSelect} name="tags" id="tags" className="select select-bordered w-full max-w-xs">
               <option disabled selected>Tags</option>
               {optionedTags}
            </select>
         </div>
         <MapContainer
            center={[userCityPosix.longitude, userCityPosix.latitude]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '300px', width: '90%', overflow: 'hidden' }}>
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {booksToShow.length != 0 ?
               booksToShow.map(book => (
                  <Marker
                     position={book.longitude && book.latitude ? [book.longitude, book.latitude]
                                 : [userCityPosix.longitude, userCityPosix.latitude]}>
                     <Popup>
                        {book.title}, {book.author}
                        <NavLink to={`/public-profile/${book.ownerId}`} >Contattami!</NavLink>
                     </Popup>
                  </Marker>))
               : null
            }
         </MapContainer>
         <p>{booksToShow.map(book => book.title)}</p>
         
      </>
   );
}