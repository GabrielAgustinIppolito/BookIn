import { Link, useLoaderData } from "react-router-dom";
import { getBookOwner, getOwnerBooks, getUser } from "../apis/book-api"
import PublicBookCard from "../components/PublicBookCard";

export const loader = async({params}) => {
   console.log(params);
   const user = await getUser();
   const owner = await getBookOwner(params.id);
   const books = await getOwnerBooks(params.id);
    return { owner, books, user };
}

export default function PublicProfile() {
    const {owner, books, user } = useLoaderData();
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
                    <p>Libri condivisi: {books.length}</p>
                    {/* ${ownerSelectedBook} */}
{/* ${userSelectedBook.value != 0 && "http://localhost:3571/book/" + userSelectedBook.value} */}
                    <div>Scambia!
                        <p>Email: <a href={`mailto:${user.email}?subject=Scambiamo un libro!&body=Salve, sono ${user.firstname}, ti va di scambiare dei libri? `} >{owner.email}</a></p>
                    </div>
                    
                   
                </div>
                <div className="profile grid place-items-center">
                Bio: -Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor quam illum eveniet repellendus nesciunt minus suscipit consequatur corporis ab,
                    incidunt porro commodi iure voluptate hic rem tempore? Voluptatibus, eius nihil.
                </div>
            </div>
            <div className="group-card">
                {cardsToShow}
            </div>
        </>
    );
}