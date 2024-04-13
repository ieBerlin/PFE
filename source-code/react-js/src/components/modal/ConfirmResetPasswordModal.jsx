import { CheckIcon } from "@heroicons/react/24/outline";

export default function ConfirmResetPasswordModal({
  onClose,
  title,
  description,
}) {
  return (
    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div className="flex flex-col w-full h-full items-center justify-center px-4">
        <CheckIcon
          className="h-12 w-12 text-emerald-600 p-3 bg-green-100 rounded-full"
          aria-hidden="true"
        />
        <h1 className="mt-2 mb-3 font-medium"> {title}</h1>
        <p className="text-center text-sm text-slate-500">{description}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-emerald-500 text-white font-semibold rounded-md px-32 py-1 hover:bg-emerald-600"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
