import React from "react";
import { Outlet } from "react-router-dom";
import Sider from "../components/Sider/Sider";
import Header from "../components/Header/Header";

export default function Root() {
  return (
    <div>
      <Sider />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
