// MainLayout.js
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div>
    <Navbar />
    <Outlet />
  </div>
);

export default MainLayout;
