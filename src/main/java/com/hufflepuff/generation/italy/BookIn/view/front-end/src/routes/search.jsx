import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { NavLink, useLoaderData } from "react-router-dom";
import { getBooksByGenre } from "../apis/book-api";

export default function Search() {
   const { tags, genres, userCityPosix } = useLoaderData();
   const [tag, setTag] = useState();

   const [booksToShow, setBookToShow] = useState([]);

   const optionedGenres = genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>);
   const optionedTags = tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>);

   const handleChangingGenres = async (e) => {
      const books = await getBooksByGenre(e.target.value);
      if(books == 404){
         setBookToShow([]);
      } else {
         console.log(books);
      setBookToShow([...books]);
      }
      
   };
   useEffect(()=>{console.log(booksToShow)},[booksToShow])
   // useEffect(() => { booksToShow ? () =>{
   //    const showPOfBooks = () => {
   //       booksToShow ? <p>{booksToShow.map(book => book.title)}</p> : null
   //    }}
   //    : null }, [booksToShow]);

   return (
      <>
         <div>
            <select onChange={handleChangingGenres} name="genres" className="select select-bordered w-full max-w-xs">
               <option disabled selected>Generi</option>
               {optionedGenres}
            </select>
            <select name="tags" className="select select-bordered w-full max-w-xs">
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
               : null}
         </MapContainer>
         <p>{booksToShow.map(book => book.title)}</p>
         
      </>
   );
}