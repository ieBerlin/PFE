import { CheckIcon } from "@heroicons/react/24/outline";

export default function SuccessMessage({ title, message }) {
  return (
    <div className="bg-emerald-100 border-s-4 border-emerald-500 p-4 my-2" role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-emerald-100 bg-emerald-200 text-emerald-800 ">
           <CheckIcon  className="flex-shrink-0 size-4"/>
          </span>
        </div>
        <div className="ms-3">
          <h3 className="text-gray-800 font-semibold capitalize">{title}</h3>
          <p className="text-sm text-gray-700 capitalize">{message}</p>
        </div>
      </div>
    </div>
  );
}
