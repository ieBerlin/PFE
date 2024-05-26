import { useState } from "react";

import {
  AcademicCapIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Modal from "../../components/modal/Modal.jsx";
import CoachBio from "../coaches/CoachBio.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CoachesList({ data }) {
  const [imageSrc, setImageSrc] = useState(null);
  console.log(data);
  const {
    coachName,
    coachEmail,
    coachExperience,
    coachLevel,
    coachCategory,
    totalTrainedMembers,
    coachContact,
  } = data;
  const isMember = useSelector(
    (state) => state.userRole?.userRole?.toLowerCase() === "member"
  );
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
          <div className="bg-white shadow-md pl-8 pr-16 py-6">
            <div className="flex flex-row justify-between">
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
            <p className="text-sm text-gray-600">{coachCategory}</p>
            <div className="flex flex-row items-center justify-start gap-3 my-3">
              <div className="bg-yellow-400 px-4 py-1 w-min rounded-md flex flex-row items-center gap-1">
                <StarIcon className="h-4 w-4 text-white " />
                <h3 className="text-white">4.5</h3>
              </div>
              <h4 className="text-gray-600"> (12)</h4>
            </div>
            <h1 className="flex items-center gap-2">
              <UserGroupIcon className="w-6 h-6 text-gray-500" />
              <p className=" text-gray-500 font-medium text-sm">
                {totalTrainedMembers} Total Trained Members
              </p>
            </h1>
            <h1 className="flex items-center gap-2 mt-2">
              <AcademicCapIcon className="w-6 h-6 text-gray-500" />
              <p className=" text-gray-500 font-medium text-sm">{coachLevel}</p>
            </h1>
            <div className="mt-4">
              <h1 className="font-semibold my-2">Connect With Me</h1>

              <a
                href={`mailto:${coachEmail}`}
                className="text-gray-600 font-medium inline"
              >
                {coachEmail}
              </a>

              {Object.entries(coachContact).map(([key, value]) => (
                <a
                  href={value}
                  className="block cursor-pointer text-gray-600 font-medium my-1"
                  target="_blank"
                  key={key}
                >
                  {value}
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
