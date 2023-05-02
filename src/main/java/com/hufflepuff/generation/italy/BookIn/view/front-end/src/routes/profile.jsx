import { Link, NavLink, useLoaderData } from "react-router-dom";
import { getUser, getUserBooks } from "../apis/book-api"

export const loader = async() => {
    const user = await getUser();
    const books = await getUserBooks();
    return { user, books };
}

export default function Profile() {
    const { user, books } = useLoaderData();
    const bookElements = books.map(b => <li key={b.id}><NavLink to={`/books/${b.id}`}>{b.title}</NavLink></li>);
    return (
        <>
            <h1>Hello {user.firstname}</h1>
            <ul>
                {bookElements}
            </ul>
        </>
    );
}