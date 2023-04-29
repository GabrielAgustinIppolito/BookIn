import { Form, redirect, useLoaderData } from "react-router-dom";
import { getGenres, getTags, saveBook } from "../apis/book-api";
import TagSelection from "../components/TagSelection";
import { useEffect, useState, useRef } from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

let selectedTags= [];
let selectedGenres=[];

export const action = async ({ request }) => {
  const formData = await request.formData();
  const bookAllData = Object.fromEntries(formData);
  // bookAllData.id = 0;
  // bookAllData.isAvailable = true;
  // const bookDto = {
  //   "id": bookAllData.id,
  //   "title": bookAllData.title,
  //   "isbn": bookAllData.isbn,
  //   "year": bookAllData.year,
  //   "publisher": bookAllData.publisher,
  //   "language": bookAllData.language,
  //   "author": bookAllData,
  //   "isShippable": bookAllData.isShippable,
  //   "review": bookAllData.review,
  //   "isAvailable": bookAllData.isAvailable
  // }
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
    "tagsDto": selectedTags,
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
  let selectedGenresRef = useRef(null);
  const {tags, genres, simpliedGenres} = useLoaderData();
  const [tagList, setTag] = useState([]);
  const animatedComponents = makeAnimated();

  useEffect(() => {
  }, [tagList]);

  const handleChangingTags = (e) => {
    let tags = tagList;
    let toDeleteId;
    if (e.target.tagName == "INPUT"){
      if (!e.target.checked) {
        for (let i = 0; i < tags.length; i++) {
          if (e.target.value === tags[i]) {
            toDeleteId = i;
          }
        }
        setTag(tags.slice(0, toDeleteId).concat(tags.slice(++toDeleteId))); //funge
      } else {
        tags.push(e.target.value);
        setTag(tags);
      }
    } 
  }
  
  const updateStates = () =>{
    for(let i = 0; i < tags.length; i++){
      for ( let j = 0; j < tagList.length; j++){
        if(tags[i].name === tagList[j]){
          selectedTags.push(tags[i]);
        }
      }
    }
    console.log(selectedGenresRef.current.props.value);
    const genresRefList = selectedGenresRef.current.props.value;
    for(let i = 0; i < genres.length; i++){
      for ( let j = 0; j < genresRefList.length; j++){
        if(genres[i].name === genresRefList[j].value){
          selectedGenres.push(tags[i]);
        }
      }
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
                ref={selectedGenresRef}
                ></Select>

        <TagSelection tagsToShow = {tags} onChange={handleChangingTags}/>
        {console.log(selectedGenresRef.current)}
        <label htmlFor="longitude">Longitudine</label>
        <input name="longitude" />
        <label htmlFor="latitude">Latitudine</label>
        <input name="latitude" />
        <label htmlFor="city">Città</label>
        <input name="city" />

        <button type="submit" onClick={updateStates}>Registra</button>
      </Form>
    </>
    );
}
