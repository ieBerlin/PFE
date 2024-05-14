import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
export default function Message() {
  return (
    <button className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <span className="text-sm font-semibold text-gray-900 ">
          Bonnie Green
        </span>
        <span className="text-sm font-normal text-gray-500 ">11:46</span>
      </div>
      <div className="flex items-start my-2.5 bg-gray-50  rounded-xl p-2">
        <div className="me-2">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-900 pb-2">
            <svg
              fill="none"
              aria-hidden="true"
              className="w-5 h-5 flex-shrink-0"
              viewBox="0 0 20 21"
            >
              <ClipboardDocumentCheckIcon className="w-8 h-8 text-gray-700" />
            </svg>
            Flowbite Terms & Conditions
          </span>
          <span className="flex text-xs font-normal text-gray-500 gap-2">
            12 Pages
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="self-center"
              width="3"
              height="4"
              viewBox="0 0 3 4"
              fill="none"
            >
              {/* SVG circle */}
            </svg>
            18 MB
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="self-center"
              width="3"
              height="4"
              viewBox="0 0 3 4"
              fill="none"
            >
              {/* SVG circle */}
            </svg>
            PDF
          </span>
        </div>
        <div className="inline-flex self-center items-center">
          <button
            className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none"
            type="button"
          >
            <svg
              className="w-4 h-4 text-gray-900 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {/* SVG paths */}
            </svg>
          </button>
        </div>
      </div>
    </button>
  );
}
