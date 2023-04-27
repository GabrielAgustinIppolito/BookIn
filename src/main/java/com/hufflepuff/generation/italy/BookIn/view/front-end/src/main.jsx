import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Book, { loader as bookLoader } from './routes/book.jsx';
import Login, { action as loginAction } from './routes/login.jsx';
import Registration, { action as registrationAction } from './routes/registration.jsx';

const router = createBrowserRouter([
  {
  path: "/",
  element: <Root />,
  children: [
    {
      path: "books/bookId",
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
    
  ]
},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
