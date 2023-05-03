import { Link, useLoaderData } from "react-router-dom";
import { getBookOwner, getOwnerBooks } from "../apis/book-api"
import PublicBookCard from "../components/PublicBookCard";

export const loader = async({params}) => {
   console.log(params);
   const owner = await getBookOwner(params.id);
   const books = await getOwnerBooks(params.id);
    return { owner, books };
}

export default function OwnerProfile() {
    const {owner, books } = useLoaderData();
    const cardsToShow = books.map(b =><PublicBookCard key={b.id} book={b} ></PublicBookCard>);
    return (
        <>
            <div className="grid grid-cols-3 gap-2 justify-center m-10 p-10">
                <div className="propic grid place-items-center">
                    <h1>Ciao! Sono {owner.firstname}!</h1> 
                    <div className="avatar">
                        <div className="w-28 rounded-full">
                            <img src="../src/assets/user_icon.png" />
                        </div>
                    </div>
                </div>
                <div className="profile grid place-items-center">
                    <p>Città: {owner.city || "città non specificata"}</p>
                    <p>Email: <a href={`mailto: ${owner.email}`}>{owner.email}</a></p>
                    <p>Libri condivisi: {books.length}</p>
                </div>
                <div className="profile grid place-items-center">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor quam illum eveniet repellendus nesciunt minus suscipit consequatur corporis ab,
                    incidunt porro commodi iure voluptate hic rem tempore? Voluptatibus, eius nihil.
                </div>
            </div>
            <div className="group-card">
                {cardsToShow}
            </div>
        </>
    );
}