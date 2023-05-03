import { NavLink, Outlet } from 'react-router-dom'
import './root.css';


export default function Root() {
   return (
      <>
      <div className="navbar bg-base-300">
         <div className="navbar-start">
            <div className="dropdown">
               <NavLink to="/books/register-new-book" className="buttons">
                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-8 w-8" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
                  </label>
               </NavLink>
            </div>
         </div>

         <div className="navbar-center">
            <figure>
               <img className="max-h-20" 
               src="../src/assets/logo_bookin_notext.png" alt="BookIn Logo" />
            </figure>
         </div>

         <div className="navbar-end">
            <div className="flex-none gap-2">
               <div className="form-control">
                  <input type="search" id="q" name="q" placeholder="Search" className="input input-bordered" />
               </div>
            </div>
            
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
               <div className="w-10 rounded-full">
                  <NavLink to= "/profile">
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