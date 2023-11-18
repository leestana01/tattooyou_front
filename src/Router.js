import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Components/MainPage/Login";
import Menus from "./Components/MainPage/Menus";
import MyPage from "./Components/MainPage/MyPage";
import Contest from "./Components/MainPage/Contest"
import Camera from "./Pages/Camera"
import CameraPhoto from "./Components/CameraPage/CameraPhoto"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "",
                element: <Login />
            },
            {
                path: "/menus",
                element: <Menus />
            },
            {
                path: "/mypage",
                element: <MyPage />
            },
            {
                path: "/contest",
                element: <Contest />
            }
        ]
    },
    {
        path: "/camera",
        element: <Camera />
    },
    {
        path: "/cameraphoto",
        element: <CameraPhoto />
    }
])

export default router;