import { Form, redirect } from "react-router-dom";
import { registration } from "../apis/book-api";

export const action = async ({ params }) => {
  await registration(Object.values(params));
  return redirect("/"); // da costruire
  //return redirect("/profile"); // da costruire
};

export default function Registration() {
  return (
    <>
      <h1>Registrati</h1>
      <Form method="post" action="registration">
        <label htmlFor="firstname">Nome</label>
        <input name="firstname" />
        <label htmlFor="lastname">Cognome</label>
        <input name="lastname" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Registrati</button>
      </Form>
    </>
  );
}
