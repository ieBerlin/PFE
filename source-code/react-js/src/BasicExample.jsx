import { useContext } from "react";
import "./BasicExample.css";
import { SidebarContext } from "./components/store/sidebar-context";
const App = () => {
  const { isOpen } = useContext(SidebarContext);
  let mainContentMargin = "70px 0 0";
  if (isOpen) {
    mainContentMargin += " 250px";
  } else {
    mainContentMargin += " 78px";
  }
  return (
    <>
      <main
        className="main-content"
        style={{
          margin: mainContentMargin,
        }}
      >
        <h1>Hello World!</h1>
      </main>
    </>
  );
};

export default App;
