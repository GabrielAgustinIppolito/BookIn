import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.jsx'
import './routes/root.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from './routes/index.jsx';
import Book, { loader as bookLoader } from './routes/book.jsx';
import Login, { action as loginAction } from './routes/login.jsx';
import Registration, { action as registrationAction, loader as registrationLoader } from './routes/registration.jsx';
import RegisterNewBook, { action as registrationBookAction, loader as registrationBookLoader } from './routes/registerNewBook.jsx';
import Profile, { loader as profileLoader } from './routes/profile.jsx';
import OwnerProfile, {loader as ownerProfileLoader} from './routes/publicProfile.jsx';
import Search, {loader as searchLoader} from './routes/search.jsx';
import ErrorPage from './routes/error-page.jsx';
import BookEdit, {loader as bookEditLoader, action as bookEditAction}  from './routes/book-edit.jsx';
import Home, {loader as homeLoader} from './routes/home.jsx';

const router = createBrowserRouter([
  {
  path: "/",
  element: <Root />,
  errorElement: <ErrorPage/>,
  children: [
    {
      index: true,
      element: <Index />,
      action: loginAction
    },{
      path: "/home",
      element: <Home />,
      loader: homeLoader
    },
    {
      path: "/books/:id",
      element: <Book />,
      loader: bookLoader
    },
    {
      path: "/edit/:id",
      element: <BookEdit />,
      loader: bookEditLoader,
      action: bookEditAction
    },
    {
      path: "/login",
      element: <Login />,
      action: loginAction
    },
    {
      path: "/login/registration",
      element: <Registration />,
      loader: registrationLoader,
      action: registrationAction
    },
    {
      path: "/books/register-new-book",
      element: <RegisterNewBook />,
      action: registrationBookAction,
      loader: registrationBookLoader
    },
    {
      path: "/profile",
      element: <Profile />,
      loader: profileLoader,
    },
    {
      path: "/public-profile/:id",
      element: <OwnerProfile />,
      loader: ownerProfileLoader,
    },
    {
      path: "/search",
      element: <Search />,
      loader: searchLoader,
    }
    
  ]
},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
