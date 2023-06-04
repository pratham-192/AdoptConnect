import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

function Routers() {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login/user", element: <Login /> },
    { path: "/login/admin", element: <Login /> },
    { path: "/profile", element: <Profile /> },
  ]);
  return routes;
}

export default Routers;
