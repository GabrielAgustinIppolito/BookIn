import { Form, redirect, useLoaderData } from "react-router-dom";
import { getGenres, getTags, getUserCityPosix, saveBook } from "../apis/book-api";
import Selection from "../components/Selection";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import MapPositioner from "../components/MapPositioner";


let globalTags = [];
let globalGenres = [];
let globalPos;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const bookAllData = Object.fromEntries(formData);
  const bookWrapper = {
    "bookDto": {
      "id": 0,
      "title": bookAllData.title,
      "isbn": bookAllData.isbn,
      "year": bookAllData.year,
      "publisher": bookAllData.publisher,
      "language": bookAllData.language,
      "author": bookAllData.author,
      "isShippable": bookAllData.isShippable == "on",
      "review": bookAllData.review,
      "isAvailable": true,
    },
    "genresDto": globalGenres,
    "tagsDto": globalTags,
    "location": {
      "id": 0,     
      "longitude": globalPos.longitude ? globalPos.longitude : globalPos.lng.toFixed(4),
      "latitude": globalPos.latitude ? globalPos.latitude : globalPos.lat.toFixed(4)
    }
  }
  console.log(bookWrapper);
  await saveBook(bookWrapper);
  return redirect("/profile");
};

export async function loader() {
  const tags = await getTags();
  const genres = await getGenres();
  const userCityPosix = await getUserCityPosix();
  return { tags, genres, userCityPosix };
}

export default function RegisterNewBook() {
  const { tags, genres, userCityPosix } = useLoaderData();
  const [tagList, setTag] = useState([]);
  const [genreList, setGenre] = useState([]);
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(userCityPosix);
  const markerRef = useRef(null);
  useEffect(() => { globalTags = [...tagList] }, [tagList]);
  useEffect(() => { globalGenres = [...genreList] }, [genreList]);
  useEffect(() => { globalPos = position}, [position]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  )
  const displayMap = useMemo(() => (
    <>
      <MapContainer
        center={[userCityPosix.latitude, userCityPosix.longitude]}
        zoom={13}
        scrollWheelZoom={false}
        ref={setMap}
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
  ), [userCityPosix, eventHandlers, position]);

  const handleChangingTags = (e) => {
    let selectedTag = [...tagList];
    let toDeleteIndex;
    if (e.target.tagName == "INPUT") {
      if (!e.target.checked) {
        for (let i = 0; i < selectedTag.length; i++) {
          if (e.target.value === selectedTag[i].name) {
            toDeleteIndex = i;
          }
        }
        selectedTag = selectedTag.slice(0, toDeleteIndex).concat(selectedTag.slice(++toDeleteIndex));
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

  const handleChangingGenres = (e) => {
    let genresSelected = [...genreList];
    let toDeleteIndex;
    if (e.target.tagName == "INPUT") {
      if (!e.target.checked) {
        for (let i = 0; i < genresSelected.length; i++) {
          if (e.target.value === genresSelected[i].name) {
            toDeleteIndex = i;
          }
        }
        genresSelected = genresSelected.slice(0, toDeleteIndex).concat(genresSelected.slice(++toDeleteIndex));
      } else {
        for (let genre of genres) {
          if (e.target.value == genre.name) {
            genresSelected.push(genre);
          }
        }
      }
      setGenre(genresSelected);
    }
  }

  const collapser = (e) => {
    let el = e.target.parentElement;
    if (el.classList.contains("collapse-close")) {
      el.classList.remove("collapse-close");
      el.classList.add("collapse-open");
    } else if (el.classList.contains("collapse-open")) {
      el.classList.remove("collapse-open");
      el.classList.add("collapse-close");
    }
  }

  return (
    <>
      <Form method="post" className="grid grid-cols-2 gap-5 m-auto mt-10 mb-10 p-5 bg-base-200 rounded-xl max-w-screen-lg shadow-2xl">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="my-titles text-4xl m-auto mt-5">Nuovo libro</h1>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="text-lg">Titolo</span>
            </label>
            <input name="title" type="text" placeholder="Scrivi qui" className="input input-bordered shadow-inner w-full max-w-xs" />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="text-lg">ISBN</span>
            </label>
            <input name="isbn" maxLength="13" type="text" placeholder="Scrivi qui" className="input input-bordered shadow-inner w-full max-w-xs" />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="text-lg">Anno di pubblicazione</span>
            </label>
            <input name="year" type="date" placeholder="Scrivi qui" className="input input-bordered shadow-inner w-full max-w-xs" />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="text-lg">Editore</span>
            </label>
            <input name="publisher" type="text" placeholder="Scrivi qui" className="input input-bordered shadow-inner w-full max-w-xs" />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="text-lg">Lingua</span>
            </label>
            <input name="language" type="text" placeholder="Scrivi qui" className="input input-bordered shadow-inner w-full max-w-xs" />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="text-lg">Autore</span>
            </label>
            <input name="author" type="text" placeholder="Scrivi qui" className="input input-bordered shadow-inner w-full max-w-xs" />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="text-lg">Recensione</span>
            </label>
            <input name="review" type="text" className="textarea textarea-bordered h-24 shadow-inner w-full max-w-xs" />
          </div>
          <p>Scegli dove scambiare il tuo libro</p>
          {displayMap}
          <div>
            <p>Posizione mappa: </p>
            {map ? <MapPositioner map={map} /> : null}
          </div>
          <div className="form-control bg-primary rounded-xl p-3">
            <label htmlFor="isShippable" className="cursor-pointer label">
              <span className="label-text text-xl mr-3 text-accent">Disponibile alla spedizione</span>
              <input type="checkbox" name="isShippable" className="checkbox checkbox-accent" />
            </label>
          </div>
          <button type="submit" className="btn btn-accent">Registra</button>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">

          <div tabIndex={0} id="genresCollapse" className="collapse collapse-close collapse-arrow border border-base-300 bg-base-100 rounded-box">
            <div onClick={collapser} className="collapse-title text-xl font-medium">
              Aggiungi dei generi
            </div>
            <div className="collapse-content">
              <Selection thingsToShow={genres} onChange={handleChangingGenres} />
            </div>
          </div>
          <div tabIndex={0} id="tagsCollapse" className="collapse collapse-close collapse-arrow border border-base-300 bg-base-100 rounded-box">
            <div onClick={collapser} className="collapse-title text-xl font-medium">
              Aggiungi dei tag
            </div>
            <div className="collapse-content">
              <Selection thingsToShow={tags} onChange={handleChangingTags} />
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}
