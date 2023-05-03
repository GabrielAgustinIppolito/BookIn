import { NavLink, useLoaderData } from "react-router-dom";
import { getUser, getUserBooks } from "../apis/book-api"
import BookCard from "../components/BookCard";

export const loader = async() => {
    const user = await getUser();
    const books = await getUserBooks();
    return { user, books };
}

export default function Profile() {
    const { user, books } = useLoaderData();
    const bookElements = books.map(b => <li key={b.id}><NavLink to={`/books/${b.id}`}>{b.title}</NavLink></li>);
    const cardsToShow = books.map(b =><BookCard key={b.id} book={b} ></BookCard>);;
    return (
        <>
            <div className="p-data">
                <div className="profile p-title-pic">
                    <h1>Ciao {user.firstname}!</h1> 
                    <img src="https://picsum.photos/200" alt="propic" id="propic" />
                </div>
                <div className="profile p-other-info">
                    <p>Città: {user.city || "città non specificata"}</p>
                    <p>Libri condivisi: {books.length}</p>
                </div>
                <div className="profile p-bio">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor quam illum eveniet repellendus nesciunt minus suscipit consequatur corporis ab, incidunt porro commodi iure voluptate hic rem tempore? Voluptatibus, eius nihil.
                    Et quaerat, voluptas itaque nisi, ratione quam tempora qui dicta modi excepturi non rerum nobis ad ab maxime sit inventore. Voluptas repudiandae voluptatem officiis nostrum earum quia iste debitis aperiam.
                    Atque neque eius aut at minima quo dolorem voluptatem qui, quisquam nam officiis. Tenetur facere alias quas exercitationem veniam assumenda, provident, accusamus amet, consectetur delectus inventore quam praesentium! Obcaecati, sint!
                </div>
            </div>
            <div className="group-card">
                {cardsToShow}
            </div>
            {/* <ul id="profile-books">
                {bookElements}
            </ul> */}
        </>
    );
}