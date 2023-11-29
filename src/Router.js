import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/MainPage/Login";
import Menus from "./Pages/MainPage/Menus";
import MyPage from "./Pages/MainPage/MyPage";
import Contest from "./Pages/MainPage/Contest";
import TattooShop from "./Pages/MainPage/TattooShop";
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
      {
        path: "/tattoo-shop",
        element: <TattooShop />,
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
