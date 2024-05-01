import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { setModalType } from "../../features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CoachBio from "../coaches/CoachBio.jsx";
import Modal from "../../components/modal/Modal.jsx";
import BillingHistory from "../../components/BillingHistory.jsx"
import { billingItems } from "../../dummy_data/dummy_users.js";
export default function UserPage({ userData }) {
  const dispatch = useDispatch();
  const {
    membershipInfo,
    name,
    avatarSrc,
    location,
    phoneNumber,
    email,
    userRole,
  } = userData;
  const membershipDaysLeft = membershipInfo.membershipDaysLeft;
  const [
    isCoachAdditionalInformationsShown,
    setIsCoachAdditionalInformationsShown,
  ] = useState(false);
  // Calculate the width based on the membership days left
  const width = Math.round(((30 - membershipDaysLeft) / 30) * 100);

  return (
    <>
      <Modal remainingDay={membershipDaysLeft} />
      <div className="flex w-full h-full px-4 py-3 bg-gray-100 flex-col">
        <h1 className="text-gray-700 font-bold text-xl mb-4">{name}</h1>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "auto 1fr auto" }}
        >
          {/* User Information */}
          <div
            className="py-7 px-3 flex flex-col gap-3 bg-white items-center rounded-md w-min"
            style={{ minWidth: "174px" }}
          >
            <img
              src={avatarSrc}
              className="rounded-full object-cover"
              style={{ height: "150px", width: "150px" }}
              alt="User Avatar"
            />
            <h2 className="bg-amber-50 text-amber-500 font-bold">{userRole}</h2>
            <h3 className="font-medium text-black text-center">{location}</h3>
            {/* Contact Information */}
            <div className="flex flex-col items-start gap-2">
              <ContactInfoIcon
                icon={<PhoneIcon className="text-gray-800 w-5 h-5" />}
                info={phoneNumber}
              />
              <ContactInfoIcon
                icon={<EnvelopeIcon className="text-gray-800 w-5 h-5" />}
                info={email}
              />
            </div>
            <div className="p-4 bg-blue-100 w-full">
              <div className="inline-block mb-2 ml-[calc(25%-1.25rem)] py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg">
                {30 - membershipDaysLeft}
              </div>
              <div
                className="flex w-full h-2 bg-gray-400 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="flex justify-center items-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500"
                  style={{ width: `${width}%` }}
                ></div>
              </div>
              <h4 className="font-medium text-sm mt-4 text-center">
                Remaining Days of User Membership
              </h4>
            </div>
            {userRole.toLowerCase() === "coach" && (
              <button
                onClick={() =>
                  setIsCoachAdditionalInformationsShown(
                    (prevState) => !prevState
                  )
                }
                className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-2 rounded-md text-center"
              >
                Additional Informations
              </button>
            )}
          </div>

          {/* Billing History */}
          {isCoachAdditionalInformationsShown ? (
            <div>
              <BillingHistory data={billingItems} />
              <CoachBio coachData={coachData} />
            </div>
          ) : (
            <BillingHistory data={billingItems} />
          )}

          {/* Action Buttons */}
          <div className="bg-white h-full w-min px-4 py-3 flex flex-col gap-2 items-center">
            <h1 className="font-semibold text-black">Actions</h1>
            {(userRole.toLowerCase() === "member" ||
              userRole.toLowerCase() === "coach") && (
              <ActionButton
                color="cyan"
                onClick={() =>
                  dispatch(setModalType("recharge-user-membership"))
                }
              >
                Recharge
              </ActionButton>
            )}
            <ActionButton
              color="red"
              onClick={() => dispatch(setModalType("delete-user"))}
            >
              Delete Account
            </ActionButton>
            <ActionButton
              color="green"
              onClick={() => dispatch(setModalType("notify-membership-end"))}
            >
              Notify Membership End
            </ActionButton>
            <ActionButton
              color="amber"
              onClick={() => dispatch(setModalType("custom-message"))}
            >
              Custom Message
            </ActionButton>
          </div>
        </div>
      </div>{" "}
    </>
  );
}


function ActionButton({ color, onClick, children }) {
  return (
    <Button color={color} className="text-white w-full" onClick={onClick}>
      {children}
    </Button>
  );
}

function ContactInfoIcon({ icon, info }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h4 className="font-medium text-md">{info}</h4>
    </div>
  );
}
const coachData = {
  bio: `
  John Doe is a passionate fitness coach with 5 years of experience.
  Specializing in fitness training, he creates personalized programs
  to help clients achieve their goals. John's approach is holistic,
  focusing on strength, cardio, flexibility, and nutrition. With his
  supportive and motivating style, he guides clients towards a
  healthier lifestyle.`,
  certificationsImages: [
    "https://international-hospitality-institute.myshopify.com/cdn/shop/products/CHGMCertificateSample.png?v=1613853914",
    "https://www.actfl.org/uploads/images/general/Opi-tester-certificate-sample.jpg",
  ],
  classes: [
    {
      href: "123",
      img: "https://cdn.fleetfeet.com/assets/Blog/Post-Images/iStock-840886888.jpg/dynamic:1-aspect:2.4-fit:cover-strategy:entropy/iStock-840886888--1440.jpg",
      title: "Class 2",
      description:
        "Phasellus consequat feugiat nulla at pharetra. Nulla facilisi. Cras sagittis placerat nisl, at efficitur libero fermentum id.",
    },
  ],
};
