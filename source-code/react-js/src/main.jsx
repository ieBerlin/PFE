import { createRoot } from "react-dom/client";
import "./app.css";
import store from "./app/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
