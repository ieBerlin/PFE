import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function UserProfilProgress({ userData }) {
  const completionPercentage = Math.floor(
    (Object.entries(userData).filter(
      ([_, value]) => String(value).trim() !== ""
    ).length /
      Object.keys(userData).length) *
      100
  );
  return (
    <div className="bg-white shadow-md relative p-4 rounded-md">
      <h1 className="font-bold mb-3">Complete your profile</h1>
      <div
        style={{
          backgroundImage: `conic-gradient(#2563eb ${completionPercentage}%, white ${completionPercentage}%)`,
        }}
        className="w-36 h-36 rounded-full relative mx-auto border border-blue-800"
      >
        <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-28 h-28 rounded-full border border-blue-800">
          <h1 className="font-bold text-2xl">{completionPercentage}%</h1>
        </div>
      </div>
      <ul className="mt-8">
        {Object.entries(userData).map(([key, value]) => (
          <li
            key={key}
            className="flex flex-row gap-4 mt-1 capitalize font-semibold"
          >
            {`${value}`.trim() !== "" ? (
              <>
                <CheckIcon className="w-6 h-6 text-gray-900" />
                <h3 className="text-gray-900 text-sm">
                  {key.replace("_", " ")}
                </h3>
              </>
            ) : (
              <>
                <XMarkIcon className="w-6 h-6 text-gray-500" />
                <h3 className="text-gray-500 text-sm">
                  {key.replace("_", " ")}
                </h3>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
