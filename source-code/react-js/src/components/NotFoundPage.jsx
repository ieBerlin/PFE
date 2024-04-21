import { Link } from "react-router-dom";
import BrokenLink from "../assets/broken-link-svgrepo-com.svg"
export default function NotFoundPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 ">
      <div className="flex flex-col">
        <h1 className="my-2 text-gray-800 font-bold text-3xl">404 Not Found</h1>
        <p className="my-2 text-gray-800 text-xl">
          Sorry, the page you're looking for does not exist.
        </p>
        <Link
          to="/"
          className=" mt-4 font-semibold tracking-widest  border rounded md py-4 px-8 text-center bg-blue-700 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
        >
          Back to Home Page
        </Link>
      </div>
      <div className=" w-52 ml-10">
        <img src={BrokenLink} alt="broken link" />
      </div>
    </div>
  );
}
