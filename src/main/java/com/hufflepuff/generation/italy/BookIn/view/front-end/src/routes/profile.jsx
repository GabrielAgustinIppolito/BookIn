import { useLoaderData } from "react-router-dom";
import { getUser, getUserBooks } from "../apis/book-api";
import BookCard from "../components/BookCard";

export const loader = async () => {
  const user = await getUser();
  const books = await getUserBooks();
  return { user, books };
};

export default function Profile() {
  const { user, books } = useLoaderData();
  const cardsToShow = books.map((b) => (
    <BookCard key={b.id} book={b}></BookCard>
  ));
 
  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 justify-center items-center place-items-center m-10 p-10">
        <div className="card w-96 h-80 bg-base-200 shadow-xl">
          <h1 className="my-titles m-auto mt-5 text-3xl">Bentornat* {user.firstname}!</h1>
          <figure className="px-10 pt-10">
            <div className="avatar">
              <div className="w-28 rounded-full">
                <img src="src/assets/user_icon.png" />
              </div>
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <p>Città: {user.city || "città non specificata"}</p>
            <p>Libri condivisi: {books.length}</p>
          </div>
        </div>
        <div className="card w-96 h-80 bg-base-200 shadow-xl">
          <h2 className="my-titles m-auto mt-5 text-3xl">Bio</h2>
          <div className="card-body items-center text-center">
            <p>{user.bio}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-2 justify-center items-center mx-auto my-5 lg:grid-cols-2">
        {cardsToShow}
      </div>
    </>
  );
}
