import { Form, redirect } from "react-router-dom";
import { registration } from "../apis/book-api";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  await registration(userData.firstname, userData.lastname,
                     userData.email, userData.password, userData.city);
  return redirect("/profile");
  //return redirect("/profile"); // da costruire
};

export default function Registration() {
  return (
    <>
      <h1>Registrati</h1>
      <Form method="post">
        <label htmlFor="firstname">Nome</label>
        <input name="firstname" />
        <label htmlFor="lastname">Cognome</label>
        <input name="lastname" />
        <label htmlFor="city">Città</label>
        <input name="city" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Registrati</button>
      </Form>
    </>
  );
}
