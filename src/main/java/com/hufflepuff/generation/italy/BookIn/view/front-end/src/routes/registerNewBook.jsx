import { Form, redirect, useLoaderData } from "react-router-dom";
import { getGenres, getTags, saveBook } from "../apis/book-api";
import TagSelection from "../components/TagSelection";
import { useEffect, useState, useRef } from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

let globalTags=[];
let selectedGenres=[];

export const action = async ({ request }) => {
  const formData = await request.formData();
  const bookAllData = Object.fromEntries(formData);
  const bookWrapper = {
    "bookDto":{
      "id": 0,
      "title": bookAllData.title,
      "isbn": bookAllData.isbn,
      "year": bookAllData.year,
      "publisher": bookAllData.publisher,
      "language": bookAllData.language,
      "author": bookAllData.author,
      "isShippable": bookAllData.isShippable == "on",
      "review": bookAllData.review,
      "isAvailable": true
    },
    "genresDto": selectedGenres,
    "tagsDto": globalTags,
    "location": {
          "id": 0,
          "longitude": bookAllData.longitude,
          "latitude": bookAllData.latitude,
          "city": bookAllData.city
      }
  }
  console.log(bookWrapper);
  
  await saveBook(bookWrapper);
  return redirect("/");
 };

 export async function loader() {
  const tags = await getTags();
  const genres = await getGenres();
  const simpliedGenres =await genres.map((genre) =>(
    { label: `${genre.name}`, value: genre.name }
 ));
  return  {tags, genres, simpliedGenres} ;
}

 export default function RegisterNewBook() {
  const {tags, genres, simpliedGenres} = useLoaderData();
  const [tagList, setTag] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const animatedComponents = makeAnimated();
  
  useEffect(()=> {globalTags = [...tagList]}, [tagList]);

   const handleChangingTags = (e) => {
     let selectedTag = [...tagList];
     let toDeleteId;
     if (e.target.tagName == "INPUT") {
       if (!e.target.checked) {
         for (let i = 0; i < selectedTag.length; i++) {
           if (e.target.value === selectedTag[i].name) {
             toDeleteId = i;
           }
         }
         selectedTag = selectedTag.slice(0, toDeleteId).concat(selectedTag.slice(++toDeleteId));
       } else {
         for (let tag of tags) {
           if (e.target.value == tag.name) {
             selectedTag.push(tag);
           }
         }
       }
       setTag(selectedTag);
     }
   }

  return(
      <>
      <h1>Nuovo libro</h1>
      <Form method="post">
     
        <label htmlFor="title">Titolo</label>
        <input name="title" />

        <label htmlFor="isbn">ISBN</label>
        <input name="isbn" maxLength="13"/>

        <label htmlFor="year">Anno di pubblicazione</label>
        <input type="date" name="year" />

        <label htmlFor="publisher">Editore</label>
        <input name="publisher" />

        <label htmlFor="language">Lingua</label>
        <input name="language" />

        <label htmlFor="author">Autore</label>
        <input name="author" />

        <label htmlFor="review">Recensione</label>
        <input name="review" />

        <label htmlFor="isShippable">Disponibile alla spedizione </label>
        <input type="checkbox" name="isShippable" />
        
        <Select options={simpliedGenres}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                ></Select>

        <TagSelection tagsToShow = {tags} onChange={handleChangingTags}/>
        <label htmlFor="longitude">Longitudine</label>
        <input name="longitude" />
        <label htmlFor="latitude">Latitudine</label>
        <input name="latitude" />
        <label htmlFor="city">Città</label>
        <input name="city" />


        <button type="submit" >Registra</button>
      </Form>
    </>
    );
}
