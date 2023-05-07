import { Form, NavLink, redirect } from "react-router-dom";
import { getAuthentication } from "../apis/book-api";

export async function action({ request }) {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  await getAuthentication(userData.email, userData.password);
  return redirect("/profile");
}

export default function Login() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
          <h1 className="my-titles text-5xl font-bold">Benvenuto in</h1>
            <figure className="w-2/6 my-5">
              <img src="../src/assets/bookin_logo_3.png" alt="bookin logo" />
            </figure>
            
            <p className="py-6 w-4/5">
              Questa è la prima app di book-crossing che ti permette di metterti in contatto
              con gli appassionati di libri della tua città.<br />
              Iscriviti subito ed entra a far parte della nostra community!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <Form method="post">
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                  <NavLink
                    to="/login/registration"
                    className="btn btn-secondary"
                  >
                    Registrati
                  </NavLink>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
