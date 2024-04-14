import { CheckIcon } from "@heroicons/react/24/outline";

export default function ConfirmResetPasswordModal({
  onClose,
  title,
  description,
  color
}) {
  console.log(color)
  const iconColorClass = `text-${color}-600`;
  const iconBgClass = `bg-${color}-100`;
  const buttonBgClass = `bg-${color}-500`;
  const buttonHoverBgClass = `hover:bg-${color}-600`;

  return (
    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div className="flex flex-col w-full h-full items-center justify-center px-4">
        <CheckIcon
          className={`h-12 w-12 ${iconColorClass} p-3 ${iconBgClass} rounded-full`}
          aria-hidden="true"
        />
        <h1 className="mt-2 mb-3 font-medium">{title}</h1>
        <p className="text-center text-sm text-slate-500">{description}</p>
        <button
          onClick={onClose}
          className={`mt-4 ${buttonBgClass} text-white font-semibold rounded-md px-32 py-1 ${buttonHoverBgClass}`}
        >
          Go back
        </button>
      </div>
    </div>
  );
}
