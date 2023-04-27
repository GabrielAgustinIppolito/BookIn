import { Form, Outlet } from 'react-router-dom'

export default function Root() {
   return (
      <>
         <div id="header">
            <h1>BookIn</h1>
            <div id="menu">
               <Form>
                  <button type="submit">Login</button>
               </Form>
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
               <Form method="post">
                  <button type="submit">New</button>
               </Form>
            </div>
         </div>

         <div id="detail">
            <Outlet></Outlet>
         </div>
      </>
   );
}