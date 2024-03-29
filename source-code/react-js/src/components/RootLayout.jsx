import { Outlet } from "react-router-dom";
import ".././app.css";
import MainNavigation from "./MainNavigation/MainNavigation.jsx";
const App = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
};

export default App;
