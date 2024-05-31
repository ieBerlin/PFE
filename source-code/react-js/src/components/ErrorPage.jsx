import { useRouteError } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage.jsx";
import ForbiddenPage from "./ForbiddenPage.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
export default function ErrorPage() {
  const error = useRouteError();
  if (error.status === 404) {
    return <NotFoundPage />;
  }
  if (error && error.status === 403) {
    return <ForbiddenPage isThrownAsAnError />;
  } else return <ErrorBoundary />;
}
