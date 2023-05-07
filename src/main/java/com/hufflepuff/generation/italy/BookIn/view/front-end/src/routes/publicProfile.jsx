import { useLoaderData } from "react-router-dom";
import { getBookOwner, getOwnerBooks, getUser } from "../apis/book-api";
import PublicBookCard from "../components/PublicBookCard";

export const loader = async ({ params }) => {
  console.log(params);
  const user = await getUser();
  const owner = await getBookOwner(params.id);
  const books = await getOwnerBooks(params.id);
  return { owner, books, user };
};

export default function PublicProfile() {
  const { owner, books, user } = useLoaderData();
  const cardsToShow = books.map((b) => (
    <PublicBookCard key={b.id} book={b}></PublicBookCard>
  ));
  return (
    <>
      <div className="grid grid-cols-2 gap-2 justify-center items-center place-items-center m-10 p-10">
        <div className="card w-96 h-80 bg-base-200 shadow-xl">
          <h1 className="my-titles m-auto mt-5 text-3xl">
            Ciao! Sono {user.firstname}!
          </h1>
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
            <div>
              Scambia!
              <p>
                Email:{" "}
                <a
                  href={`mailto:${user.email}?subject=Scambiamo un libro!&body=Salve, sono ${user.firstname}, ti va di scambiare dei libri? `}
                >
                  {owner.email}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="card flex place-content-center w-full p-10 h-80 bg-base-100 shadow-xl">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor quam
            illum eveniet repellendus nesciunt minus suscipit consequatur
            corporis ab, incidunt porro commodi iure voluptate hic rem tempore?
            Voluptatibus, eius nihil.
          </p>
        </div>
      </div>
      <div className="group-card">{cardsToShow}</div>
    </>
  );
}
