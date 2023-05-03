import { Form, redirect } from "react-router-dom";
import { getAuthentication } from "../apis/book-api";

export  async function action({ request }) {
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
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
            <Form
            method="post">
                <div className="form-control">
                <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                </label>
                <input type="text" id="email" name="email" placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" id="password" name="password" placeholder="password" className="input input-bordered" />
                
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
                </div>

            </Form>
      </div>
    </div>
  </div>
</div>
        
        </>
    );
}