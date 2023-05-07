import { NavLink, useRouteError } from "react-router-dom";


export default function ErrorPage() {
  const error = useRouteError();
  // let button;
  // console.log(error);
  // try{
  //   if(error.status || error.response.status ){
  //     switch (error.status ||error.response.status ) {
  //       case 403:
  //         button = <NavLink className="btn btn-warning rounded-full" to={"/login"}>Login page</NavLink>;
  //         break;
  //       case 404:
  //         button = <NavLink className="btn btn-warning rounded-full" to={"/profile"}>Sweet place</NavLink>;
  //         break;
  //       default:
  //         button = <NavLink className="btn btn-warning rounded-full" to={"/search"}>Login page</NavLink>;
  //     }
   
  //   } else {
  //     button = <NavLink className="btn btn-warning rounded-full" to={"/search"}>search page</NavLink>;
  //   }
  // } catch(error){
  //   button = <NavLink className="btn btn-warning rounded-full" to={"/search"}>search page</NavLink>;
  // }
  
  
  return (
    <div className="bg-base-100 py-6 my-10 sm:py-0">
  <div className="mx-auto max-w-screen-xl px-4 md:px-8">
    <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
      
      <div className="h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:rounded-none sm:shadow-none md:h-auto">
        <img src="https://images.unsplash.com/photo-1611890798517-07b0fcb4a811" loading="lazy" alt="Photo by Jeremy Cai" className="h-full w-full object-cover object-center" />
      </div>
      

      
      <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32 xl:py-64">
        <p className="mb-4 text-sm font-semibold uppercase text-error md:text-base"><i>{error.statusText || error.message}</i></p>
        <h1 className="my-titles mb-2 text-center text-2xl font-bold text-error sm:text-left md:text-3xl">Ops!</h1>

        <p className="mb-8 text-center text-gray-500 sm:text-left md:text-lg">Sembra che qualcosa sia andato storto...</p>
<NavLink to={"/"}>
        <button className="inline-block rounded-lg bg-secondary px-8 py-3 text-center text-sm font-semibold text-primary outline-none ring-indigo-300 transition duration-100 hover:bg-warning focus-visible:ring active:text-primary md:text-base">Torna alla home</button>
</NavLink>
      </div>
      
    </div>
  </div>
</div>
    // <div id="error-page">
    //   <h1>Oops!</h1>
    //   <p>Sorry, an unexpected error has occurred.</p>
    //   <NavLink className="btn btn-warning rounded-full" to={"/search"}>Login page</NavLink>
    //   {/* <p>
    //     <i>{error.statusText || error.message}</i>
    //   </p>
    //   {button} */}
    // </div>
  );
}