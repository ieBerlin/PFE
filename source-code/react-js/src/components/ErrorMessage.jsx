export default function ErrorMessage({ title, message }) {
  return (
    <div className="bg-red-100 border-s-4 border-red-500 p-4 my-2" role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 ">
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
        </div>
        <div className="ms-3">
          <h3 className="text-gray-800 font-semibold capitalize">
            {title || "An error occurred"}
          </h3>
          <p className="text-sm text-gray-700 capitalize">
            {message || "An error occurred while processing your request."}
          </p>
        </div>
      </div>
    </div>
  );
}
