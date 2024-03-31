import "./BasicExample.css";
import { useSelector } from "react-redux";
const App = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
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
