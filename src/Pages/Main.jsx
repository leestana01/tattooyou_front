import React from "react";
import { Outlet } from "react-router-dom";
import ScreenContainer from "../Components/Common/ScreenContainer";

function Main() {
  return (
    <div>
      <ScreenContainer>
        <Outlet />
      </ScreenContainer>
    </div>
  );
}

export default Main;
