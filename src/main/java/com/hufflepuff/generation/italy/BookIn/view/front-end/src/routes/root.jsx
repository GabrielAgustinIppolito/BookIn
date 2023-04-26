import { Outlet, Form } from 'react-router-dom'

export default function Root() {
   return (
      <>
         <div id="header">
            <h1>BookIn</h1>
            <div id="menu">
               <ul><li>Login</li></ul>
               <form id="search-form" role="search">
                  <input
                     id="q"
                     aria-label="Search contacts"
                     placeholder="Search"
                     type="search"
                     name="q"
                  />
                  <div
                     id="search-spinner"
                     aria-hidden
                     hidden={true}
                  />
                  <div
                     className="sr-only"
                     aria-live="polite"
                  ></div>
               </form>
               <form method="post">
                  <button type="submit">New</button>
               </form>
            </div>
         </div>

         <div id="detail">
            <ul>
               <li>libro1</li>
               <li>libro2</li>
               <li>libro3</li>
            </ul>
         </div>
      </>
   );
}