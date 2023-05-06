import { NavLink, Outlet } from "react-router-dom";
import "./root.css";

export default function Root() {

  return (
    <>
      <div className="navbar bg-base-300 mb-10 shadow-lg">
        <div className="navbar-start">
          <div>
            <NavLink to="/books/register-new-book" className="buttons mr-5">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-8 w-8"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                  ></path>
                </svg>
              </label>
            </NavLink>
          </div>
          <div className="w-10 rounded-full">
              <NavLink to="/search">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" 
              ><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path><path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path></svg>
              </NavLink>
            </div>
        </div>

        <div className="navbar-center">
          <figure>
            <img
              className="max-h-20"
              src="../src/assets/logo_bookin_notext.png"
              alt="BookIn Logo"
            />
          </figure>
        </div>

        <div className="navbar-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <NavLink to="/profile">
                <img src="../src/assets/user_icon.png" />
              </NavLink>
            </div>
          </label>
        </div>
      </div>

      <div id="detail">
        <Outlet></Outlet>
      </div>
    </>
  );
}
