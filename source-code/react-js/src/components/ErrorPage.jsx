import { useRouteError } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage.jsx"

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error.status)
  if (error.status === 404) {
    return <NotFoundPage />;
  }
  return <p>{error.status}</p>
  // if(
  // error.status==403
  // )
}
