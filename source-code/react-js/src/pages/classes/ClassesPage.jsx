import { Await, json, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import FallbackText from "../../components/FallbackText.jsx";
import ClassesList from "./ClassesList.jsx";
import { fetchFun, getToken } from "../../hooks/http.js";
export default function ClassesPage() {
 
  return (
    <section className="bg-gray-100 min-h-[calc(100vh-60px)] px-5  pb-40 pt-4">
      <h1 className="text-4xl text-black">Classes</h1>
      <Suspense fallback={<FallbackText title="Fetching available classes" />}>
        <Await resolve={loader()}>
          {(resolvedData) => <ClassesList data={resolvedData} />}
        </Await>
      </Suspense>
    </section>
  );
}
async function loader() {
  try {
    return await fetchFun({
      url: "http://localhost:8081/class",
      options: {
        headers: { "x-access-token": getToken(), method: "GET" },
      },
    });
  } catch (error) {
    return []
  }
}
export function action() {
  return;
}
