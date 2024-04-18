import { CheckIcon } from "@heroicons/react/24/outline";
import { useFetch } from "../../hooks/http";
import LoadingIndicator from "../LoadingIndicator.jsx";

export default function ConfirmModal({
  onClose,
  title,
  description,
  color = "blue",
  confirmButtonLabel = "Go Back",
  onConfirm,
}) {
  const { isFetching, fetchData } = useFetch(onConfirm);
  const iconColorClass = `text-blue-600`;
  const iconBgClass = `bg-blue-100`;
  const buttonBgClass = `bg-blue-500`;
  const buttonHoverBgClass = `hover:bg-blue-600`;

  function handleButtonClick() {
    if (onConfirm) {
      fetchData().then(onConfirm());
    } else {
      console.log("Clicked");
      onClose();
    }
  }

  return (
    <div className="bg-white px-4 pb-4 pt-5 ">
      <div className="flex flex-col w-full h-full items-center justify-center px-4">
        <CheckIcon
          className={`h-12 w-12 ${iconColorClass} p-3 ${iconBgClass} rounded-full`}
          aria-hidden="true"
        />
        <h1 className="mt-2 mb-3 font-medium">{title}</h1>
        <p className="text-center text-sm text-slate-500">{description}</p>

        <button
          onClick={handleButtonClick}
          className={`mt-4 ${buttonBgClass} text-white font-semibold rounded-md px-32 py-1 ${buttonHoverBgClass}`}
        >
          {onConfirm && isFetching ? (
            <LoadingIndicator fill="gray-500" />
          ) : (
            confirmButtonLabel
          )}
        </button>
      </div>
    </div>
  );
}
