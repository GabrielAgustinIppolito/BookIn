import { useLoaderData } from "react-router-dom";
import { getBookOwner, getOwnerBooks } from "../apis/book-api";
import PublicBookCard from "../components/PublicBookCard";

export const loader = async ({ params }) => {
  const owner = await getBookOwner(params.id);
  const books = await getOwnerBooks(params.id);
  return { owner, books };
};

export default function PublicProfile() {
  const { owner, books } = useLoaderData();
  const cardsToShow = books.map((b) => (
    <PublicBookCard key={b.id} book={b}></PublicBookCard>
  ));
  return (
    <>
      <div className="grid grid-cols-1 gap-2 justify-center items-center place-items-center m-10 p-10 lg:grid-cols-2 ">
        <div className="card w-96 p-5 bg-base-200 shadow-xl">
          <h1 className="my-titles m-auto mt-5 text-3xl">
            Ciao! Sono {owner.firstname}!
          </h1>
          <figure className="px-10 pt-10">
            <div className="avatar">
              <div className="w-28 rounded-full">
                <img src="../src/assets/user_icon.png" />
              </div>
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <p>Città: {owner.city || "città non specificata"}</p>
            <p>Libri condivisi: {books.length}</p>
            <p>
                <a href={`mailto:${owner.email}?subject=Scambiamo un libro!`} className="btn btn-primary">Scambia con {owner.firstname}</a>
            </p>
          </div>
        </div>
        <div className="card w-96 h-80 bg-base-200 shadow-xl">
          <h2 className="my-titles m-auto mt-5 text-3xl">Bio</h2>
          <div className="card-body items-center text-center">
            <p>{owner.bio}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-2 justify-center items-center mx-auto my-5 lg:grid-cols-2">
        {cardsToShow}
      </div>
    </>
  );
}
