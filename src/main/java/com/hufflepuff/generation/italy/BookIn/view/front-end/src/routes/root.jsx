import { NavLink, Outlet } from 'react-router-dom'


export default function Root() {
   return (
      <>
         <div id="header">
            <h1>BookIn</h1>
            <div id="menu">
               <NavLink to= "/login" className="buttons">
                  Login
               </NavLink>
               <NavLink to= "/profile" className="buttons">
                  <img src="src\assets\user.jpg" alt="Profile" />
               </NavLink>
               <form id="search-form" role="search">
                  <input
                     id="q"
                     placeholder="Search"
                     type="search"
                     name="q"
                  />
                  
               </form>
               <NavLink to="/books/register-new-book" className="buttons">
                  New
               </NavLink>
            </div>
         </div>

         <div id="detail">
            <Outlet></Outlet>
         </div>
      </>
   );
}