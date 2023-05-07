import { NavLink, useRouteError } from "react-router-dom";


export default function ErrorPage() {
  // const error = useRouteError();
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
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <NavLink className="btn btn-warning rounded-full" to={"/search"}>Login page</NavLink>
      {/* <p>
        <i>{error.statusText || error.message}</i>
      </p>
      {button} */}
    </div>
  );
}