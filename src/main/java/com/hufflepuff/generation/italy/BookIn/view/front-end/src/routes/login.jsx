import { Form, redirect } from "react-router-dom";
import { getAuthentication } from "../apis/book-api";

export const action = async ({ email, password }) => {
    await getAuthentication(email, password);
    return redirect("/");
}

export default function Login() {
    
    return (
        <>
        <h1>Login</h1>
        <Form
        method="post"
        action="login"
            >
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
            <label htmlFor="password"></label>
            <input type="password" name="password" id="password" />
            <button type="submit">Entra</button>
        </Form>
        <Form
        action="registration">
            <button type="submit">Registrati</button>
        </Form>
        </>
    );
}