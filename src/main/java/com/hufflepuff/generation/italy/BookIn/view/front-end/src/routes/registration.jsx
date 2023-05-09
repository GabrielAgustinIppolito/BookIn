import { Form, redirect, useLoaderData } from "react-router-dom";
import { getCities, registration } from "../apis/book-api";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  console.log(userData);
  await registration(userData.firstname, userData.lastname,
    userData.email, userData.password, userData.city, userData.bio);
  return redirect("/profile");
};

export const loader = async () => {
  const citiesOptions = await getCities();
  return { citiesOptions };
};

export default function Registration() {
  const { citiesOptions } = useLoaderData();
  const optionedCities = citiesOptions.map(city => <option key={city.id} value={city.id}>{city.name}</option>);
  //const [cityId, setCityId] = useState();

  return (
    <>
      <Form method="post" className="flex flex-col gap-y-5 justify-center items-center m-auto mt-10 mb-10 p-5 bg-base-200 rounded-xl max-w-screen-md min-w-min shadow-2xl">
        <h1 className="my-titles text-4xl m-auto mt-5">Registrati</h1>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-lg">Nome</span>
          </label>
          <input name="firstname" type="text" placeholder="Scrivi qui" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-lg">Cognome</span>
          </label>
          <input name="lastname" type="text" placeholder="Scrivi qui" className="input input-bordered w-full max-w-xs" />
        </div>

        <select name="city" className="select w-full max-w-xs">
          <option disabled selected>Scegli la tua città</option>
          {optionedCities} 
        </select>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-lg">Email</span>
          </label>
          <input name="email" type="email" placeholder="Scrivi qui" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-lg">Password</span>
          </label>
          <input name="password" type="password" placeholder="Scrivi qui" className="input input-bordered w-full max-w-xs" />
        </div>

        <textarea id="bio" name="bio" rows="6" cols="40"className="textarea textarea-accent w-full max-w-xs" placeholder="Bio"/>

        <button className="btn btn-primary" type="submit">Registrati</button>
      </Form>
    </>
  );
}
