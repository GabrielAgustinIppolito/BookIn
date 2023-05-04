import { useLoaderData } from "react-router-dom";
import { getUser, getUserBooks } from "../apis/book-api"
import BookCard from "../components/BookCard";

export const loader = async() => {
    const user = await getUser();
    const books = await getUserBooks();
    return { user, books };
}

export default function Profile() {
    const { user, books } = useLoaderData();
    const cardsToShow = books.map(b =><BookCard key={b.id} book={b} ></BookCard>);
    return (
        <>
            <div className="grid grid-cols-3 gap-2 justify-center m-10 p-10">
                <div className="propic grid place-items-center">
                    <h1>Ciao {user.firstname}!</h1> 
                    <div className="avatar">
                        <div className="w-28 rounded-full">
                            <img src="src/assets/user_icon.png" />
                        </div>
                    </div>
                </div>
                <div className="profile grid place-items-center">
                    <p>Città: {user.city || "città non specificata"}</p>
                    <p>Libri condivisi: {books.length}</p>
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