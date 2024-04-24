import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

export default function UserPage() {
  const userData = {
    name: "User Name",
    location: "Berlin, Germany",
    phoneNumber: "+213 687-456-6456",
    email: "aeourmassi@gmail.com",
    avatarSrc:
      "https://i1.sndcdn.com/avatars-l1naSpQtTriIecnJ-Rf6eyQ-t240x240.jpg",
    userRole: "Coach", // or whatever status you have
  };

  return (
    <div className="flex w-full h-full px-4 py-3 bg-gray-100 flex-col">
      <h1 className="text-gray-700 font-bold text-xl">{userData.name}</h1>
      <div className="grid" style={{ gridTemplateColumns: "auto 1fr auto" }}>
        {/* User Information */}
        <div
          className="py-7 px-3 flex flex-col gap-3 bg-white items-center rounded-md w-min mt-4"
          style={{ minWidth: "174px" }}
        >
          <img
            src={userData.avatarSrc}
            className="rounded-full object-cover"
            style={{ height: "150px", width: "150px" }}
            alt="User Avatar"
          />
          <h2 className="bg-amber-50 text-amber-500 font-bold">
            {userData.userRole}
          </h2>
          <h3 className="font-medium text-black text-center">
            {userData.location}
          </h3>
          {/* Contact Information */}
          <div className="flex items-center gap-2">
            <PhoneIcon className="text-gray-800 w-5 h-5" />
            <h4 className="font-medium text-md">{userData.phoneNumber}</h4>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="text-gray-800 w-5 h-5" />
            <h4 className="font-medium text-md">{userData.email}</h4>
          </div>
        </div>

        {/* Spacer */}
        <div></div>

        {/* Action Buttons */}
        <div className="bg-white h-full w-min px-4 py-3 flex flex-col gap-2 items-center">
          <h1 className="font-semibold text-black">Actions</h1>
          {(userData.userRole.toLowerCase() === "member" ||
            userData.userRole.toLowerCase() === "coach") && (
            <Button color="cyan" className="w-full">
              Recharge
            </Button>
          )}
          <Button color="red" className="w-full">
            Delete Account
          </Button>
          <Button color="green" className="w-full">
            Notify Membership End
          </Button>
        </div>
      </div>
    </div>
  );
}
