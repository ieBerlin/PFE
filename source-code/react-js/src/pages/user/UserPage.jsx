import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { setModalType } from "../../features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CoachBio from "../coaches/CoachBio.jsx";
import FallbackText from "../../components/FallbackText.jsx";
import BillingHistory from "../../components/BillingHistory.jsx";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchFun, getToken } from "../../hooks/http.js";
export default function UserPage() {
  const { userId } = useParams();
  const [
    isCoachAdditionalInformationsShown,
    setIsCoachAdditionalInformationsShown,
  ] = useState(false);
  const results = useQueries({
    queries: [
      {
        queryKey: ["user-" + userId],
        queryFn: async () =>
          await fetchFun({
            url: "http://localhost:8081/user/profile/" + userId,
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
      },
      {
        queryKey: ["billing"],
        queryFn: async () =>
          await fetchFun({
            url:
              "http://localhost:8081/transactions/user-transactions/" + userId,
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
      },
    ],
  });
  const queriesResult = useQueries({
    queries: [
      {
        queryKey: ["coaches"],

        queryFn: async () =>
          await fetchFun({
            url: "http://localhost:8081/coaches/" + userId,
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),

        enabled: results[0].data?.role === "coach",
      },
      {
        queryKey: ["membership"],
        queryFn: async () =>
          await fetchFun({
            url: `http://localhost:8081/membership/membership-status/` + userId,
            options: {
              method: "GET",
              headers: {
                "x-access-token": getToken(),
              },
            },
          }),
      },
    ],
  });
  const coachData = queriesResult[0].data;
  const billingHistory = results[1].data ?? [];
  const userData = results[0].data;
  const dispatch = useDispatch();

  if (results[0].isPending || results[1].isPending) {
    return (
      <div className="px-5 py-7">
        <FallbackText title="Fetching user data" />
      </div>
    );
  }
  const {
    // membershipInfo,
    first_name,
    last_name,
    avatarSrc,
    address,
    phone_number,
    email,
    role,
  } = userData;
  // const membershipDaysLeft = membershipInfo.membershipDaysLeft;

  // Calculate the width based on the membership days left
  // const width = Math.round(((30 - membershipDaysLeft) / 30) * 100);

  const name = first_name + " " + last_name;
  return (
    <>
      {/* <Modal remainingDay={membershipDaysLeft} /> */}
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
              src={
                avatarSrc ??
                "http://localhost:8081/uploads/images/profile/default-user-image.webp"
              }
              className="rounded-full object-cover"
              style={{ height: "150px", width: "150px" }}
              alt="User Avatar"
            />
            <h2 className="bg-amber-50 text-amber-500 font-bold">{role}</h2>
            <h3 className="font-medium text-black text-center">{address}</h3>
            {/* Contact Information */}
            <div className="flex flex-col items-start gap-2">
              <ContactInfoIcon
                icon={<PhoneIcon className="text-gray-800 w-5 h-5" />}
                info={phone_number}
              />
              <ContactInfoIcon
                icon={<EnvelopeIcon className="text-gray-800 w-5 h-5" />}
                info={email}
              />
            </div>
            {role.toLowerCase() === "member" && queriesResult[1].isFetching ? (
              <h1 className="text-blue-600 font-semibold bg-gray-blue p-2 rounded-md">
                Loading...
              </h1>
            ) : (
              <>
                {queriesResult[1].data?.status ? (
                  <div className="p-4 bg-blue-100 w-full text-center">
                    <h4 className="font-medium text-sm mt-4 text-center inline-block">
                      Remaining Days of User Membership
                    </h4>
                    <div className="inline-block mb-2 py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg">
                      {queriesResult[1].data?.daysLeft} Day Left
                    </div>
                  </div>
                ) : (
                  <h1 className="text-red-600 font-semibold bg-red-100 p-2 rounded-md">
                    Membership ends
                  </h1>
                )}
              </>
            )}

            {role.toLowerCase() === "coach" && (
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
            <div className="flex flex-col gap-4">
              <BillingHistory data={billingHistory} />
              <CoachBio coachData={coachData} />
            </div>
          ) : (
            <BillingHistory data={billingHistory} />
          )}

          {/* Action Buttons */}
          <div className="bg-white h-full w-min px-4 py-3 flex flex-col gap-2 items-center">
            <h1 className="font-semibold text-black">Actions</h1>
            {role.toLowerCase() === "member" && (
              <>
                <ActionButton
                  color="cyan"
                  onClick={() =>
                    dispatch(setModalType("recharge-user-membership"))
                  }
                >
                  Recharge
                </ActionButton>
                <ActionButton
                  color="blue"
                  onClick={() =>
                    dispatch(setModalType("notify-membership-end"))
                  }
                >
                  Notify Membership End
                </ActionButton>
              </>
            )}
            <ActionButton
              color="red"
              onClick={() => dispatch(setModalType("delete-user"))}
            >
              Delete Account
            </ActionButton>

            <ActionButton
              color="amber"
              onClick={() => dispatch(setModalType("custom-message"))}
            >
              Custom Message
            </ActionButton>
            {results[0].data && results[0].data.status === "active" ? (
              <ActionButton
                color="red"
                onClick={() => dispatch(setModalType("block-user"))}
              >
                Block User Account
              </ActionButton>
            ) : (
              <ActionButton
                color="green"
                onClick={() => dispatch(setModalType("activate-user"))}
              >
                Activate User Account
              </ActionButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function ActionButton({ color, onClick, children, classes }) {
  return (
    <Button
      color={color}
      className={" text-white w-full " + classes}
      onClick={onClick}
    >
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
