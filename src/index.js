
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar";
import Home from "./components/HomeScreen";
import FavoriteList from "./components/FavouriteScreen";

let MainComponent= () => {
  return (
      <div>
          <Provider store={store}>
            <Navbar/>
            <Outlet/>
          </Provider>
      </div>
  )
}
const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainComponent/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/favourites",
        element: <FavoriteList/>
      }
    ]
  }
])
let element = document.getElementById('root');
let root = ReactDOM.createRoot(element);
root.render(<RouterProvider router={mainRouter}/>);
reportWebVitals();
