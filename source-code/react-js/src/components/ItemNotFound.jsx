import { BellAlertIcon } from "@heroicons/react/20/solid";

export default function ItemNotFound({ title }) {
  return (
    <div className="bg-red-50  rounded-md py-3 mt-5 mx-4 flex justify-center gap-4 items-center">
      <BellAlertIcon className="bg-red-100 text-red-600 rounded-full p-3 w-12 h-12" />

      <h3 className="text-gray-800 text-xl my-5 text-center font-semibold">
        {title}
      </h3>
    </div>
  );
}
