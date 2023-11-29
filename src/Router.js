import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/MainPage/Login";
import Register from "./Pages/MainPage/Register"
import Menus from "./Pages/MainPage/Menus";
import MyPage from "./Pages/MainPage/MyPage";
import Contest from "./Pages/MainPage/Contest";
import Shops from "./Pages/MainPage/Shops";
import CameraForFun from "./Pages/CameraForFun";
import CameraForReal from "./Pages/CameraForReal";
import CameraPhoto from "./Pages/CameraPage/CameraPhoto";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/menus",
        element: <Menus />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/contest",
        element: <Contest />,
      },
      // {
      //   path: "/tattoo-shop",
      //   element: <TattooShop />,
      // },
      {
        path: "/shops",
        element: <Shops />,
      },
      {
        path: "/cameraphoto",
        element: <CameraPhoto />
      }
    ],
  },
  {
    path: "/cameraforfun",
    element: <CameraForFun />,
  },
  {
    path: "/cameraForReal",
    element: <CameraForReal />,
  },
]);

export default router;
