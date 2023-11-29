import React from "react";
import ReactDOM from "react-dom/client";
import router from "./Router";
import { RouterProvider } from "react-router-dom";
import ResetCss from "./ResetCss";


ReactDOM.createRoot(document.getElementById("root"))
.render(<><ResetCss/><RouterProvider router={router}/></>);