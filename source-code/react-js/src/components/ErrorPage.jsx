import { useRouteError } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage.jsx";
import ForbiddenPage from "./ForbiddenPage.jsx"
export default function ErrorPage() {
  const error = useRouteError();
  if (error.status === 404) {
    return <NotFoundPage />;
  }
  if (error.data && error.data.status === 403) {
    return <ForbiddenPage />;
  }
  return <p>{error.status}</p>;
  // if(
  // error.status==403
  // )
}
