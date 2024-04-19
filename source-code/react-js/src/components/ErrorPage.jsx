import { useRouteError } from "react-router-dom";
import NotFoundPage from "../pages/not-found/NotFoundPage";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error.status)
  if (error.status === 404) {
    return <NotFoundPage />;
  }
  // if(
  // error.status==403
  // )
}