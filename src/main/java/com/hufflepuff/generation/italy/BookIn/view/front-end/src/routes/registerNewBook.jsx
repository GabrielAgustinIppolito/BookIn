import { Form, useLoaderData } from "react-router-dom";
import { saveBook, getTags } from "../apis/book-api";
import TagSelection from "../components/TagSelection";

export const action = async ({ request }) => {
   const formData = await request.formData();
   const bookData = Object.fromEntries(formData);
   bookData.id = 0 ;
   bookData.isAvailable = true;
   await saveBook(bookWrapper);
  //  await saveBook(bookData.firstname, bookData.lastname,
  //   bookData.email, bookData.password);
  //  return redirect("/");
   //return redirect("/profile"); // da costruire
 };

 export async function loader() {
  const tags = await getTags();
  return  {tags} ;
}

 export default function RegisterNewBook() {
  const {tags} = useLoaderData();
    return(
      <>
      <h1>Nuovo libro</h1>
      <Form method="post">
     
        <label htmlFor="title">Titolo</label>
        <input name="title" />

        <label htmlFor="isbn">ISBN</label>
        <input name="isbn" length="13"/>

        <label htmlFor="year">Anno di pubblicazione</label>
        <input type="number" name="year" />

        <label htmlFor="publisher">Editore</label>
        <input name="publisher" />

        <label htmlFor="language">Lingua</label>
        <input name="language" />

        <label htmlFor="author">Autore</label>
        <input name="author" />

        <label htmlFor="review">Recensione</label>
        <input name="review" />

        <label htmlFor="isShippable">Disponibile alla spedizione</label>
        <input type="checkbox" name="isShippable" />
        
        <TagSelection tagsToShow= {tags}/>

        <button type="submit">Registra</button>
      </Form>
    </>
    );
}

//  {
//   "bookDto":
//   {
//   "id": 0,
//   "title": "La notte che mi svegliai con un d***o 3",
//   "isbn": "111122220002",
//   "year": "2015-05-22",
//   "publisher": "Bompiani",
//   "language": "english",
//   "author": "Gabriel Ippolito",
//   "isShippable": true,
//   "review": "Capolavorone",
//   "isAvailable": true
//   },
//   "genresDto": [
//      {
//          "id": 0,
//          "name": "Action"
//      }
//  ],
//  "tagsDto": [
//      {
//          "id": 0,
//          "name": "Suspence"
//      }
//  ],
//  "location": {
//       "id": 0,
//       "longitude": 37.054,
//       "latitude": 50.124,
//       "city": "Catania"
//   }
 
// }