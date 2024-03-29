import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function Root() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
