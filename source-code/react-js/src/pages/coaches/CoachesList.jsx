import { useState } from "react";

import {
  AcademicCapIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Modal from "../../components/modal/Modal.jsx";
import FallbackText from "../../components/FallbackText.jsx";
import CoachBio from "../coaches/CoachBio.jsx";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchFun, getToken } from "../../hooks/http.js";
import ErrorMessage from "../../components/ErrorMessage.jsx";

export default function CoachesList() {
  const { coachId } = useParams();
  const [imageSrc, setImageSrc] = useState(null);
  const isMember = useSelector(
    (state) => state.userRole?.userRole?.toLowerCase() === "member"
  );
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["coaches"],
    staleTime: Infinity,
    retry:false,
    queryFn: async () =>
      await fetchFun({
        url: "http://localhost:8081/coaches/" + coachId,
        options: {
          method: "GET",
          headers: {
            "x-access-token": getToken(),
          },
        },
      }),
  });
  if (isPending) {
    return <FallbackText title="Fetching coach data..." />;
  }

  if (isError) {
    if (error.code === 404) {
      // throw { status: 404 };
      return <FallbackText title="Coach not found!" />;
    }
    return (
      <div className="">
        <h1 className="font-medium text-lg text-red-500">Errors </h1>
        {error
          ? Object.entries(error.info).map(([key, value]) => {
              console.log(error.info);
              return <ErrorMessage key={key} title={key} message={value} />;
            })
          : "An error occured!"}
      </div>
    );
  }
  if (!data) {
    <p className="text-black text-center text-xl font-semibold my-16">
      Nothing to show
    </p>;
  }

  const {
    first_name,
    last_name,
    email: coachEmail,
    experienceLevel: coachExperience,
    specialization: coachCategory,
    totalTrainedMembers,
    contact,
    certifications,
    bio,
  } = data;
  const coachContact = JSON.parse(contact);
  const coachData = {
    bio,
    certificationsImages: certifications,
  };
  const coachName = first_name + " " + last_name;
  return (
    <>
      <Modal imageSrc={imageSrc} />
      <div className="bg-gray-100 py-4 px-10">
        <div className="py-2 pl-5">
          <img
            className="rounded-full w-32 h-32 object-cover"
            src="https://evilreporterchick.files.wordpress.com/2010/03/jeremy_renner.jpg"
            alt=""
          />
        </div>
        <div
          className="grid mt-4"
          style={{
            gridTemplateColumns: "auto 1fr",
          }}
        >
          <div className="bg-white shadow-md px-4 py-6">
            <div className="flex flex-row justify-between gap-3">
              <h1 className="font-bold text-2xl">{coachName}</h1>
              {isMember && (
                <Link
                  to={"connect"}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-white"
                >
                  Contact with
                </Link>
              )}
            </div>
            <h3 className="text-sm text-blue-900 font-semibold bg-blue-100 px-3 py-1 inline-block rounded-md my-2">
              {coachCategory}
            </h3>

            <h1 className="flex items-center gap-2">
              <UserGroupIcon className="w-6 h-6 text-gray-500" />
              <p className=" text-gray-500 font-medium text-sm">
                {totalTrainedMembers} Total Trained Members
              </p>
            </h1>
            {/* <h1 className="flex items-center gap-2 mt-2">
              <AcademicCapIcon className="w-6 h-6 text-gray-500" />
              <p className=" text-gray-500 font-medium text-sm">{coachLevel}</p>
            </h1> */}
            <div className="mt-4">
              <h1 className="font-semibold my-2">Connect With Me</h1>

              <a
                href={`mailto:${coachEmail}`}
                className="text-gray-600 font-medium inline"
              >
                {coachEmail}
              </a>

              {coachContact.map((item) => (
                <a
                  href={Object.values(item)[0]}
                  className="block cursor-pointer text-gray-600 font-medium my-1"
                  target="_blank"
                  key={Object.keys(item)[0]}
                >
                  {Object.values(item)[0]}
                </a>
              ))}
            </div>
          </div>

          <CoachBio coachData={coachData} setImage={setImageSrc} />
        </div>
      </div>
    </>
  );
}
