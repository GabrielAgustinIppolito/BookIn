import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Book, { loader as bookLoader } from './routes/book.jsx';
import Login, { action as loginAction } from './routes/login.jsx';
import Registration, { action as registrationAction } from './routes/registration.jsx';
import RegisterNewBook, { action as registrationBookAction, loader as registrationBookLoader } from './routes/registerNewBook.jsx';
import Profile, { loader as profileLoader } from './routes/profile.jsx';

const router = createBrowserRouter([
  {
  path: "/",
  element: <Root />,
  children: [
    {
      path: "books/:id",
      element: <Book />,
      loader: bookLoader
    },
    {
      path: "/login",
      element: <Login />,
      action: loginAction
    },
    {
      path: "/login/registration",
      element: <Registration />,
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
    }
    
  ]
},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
