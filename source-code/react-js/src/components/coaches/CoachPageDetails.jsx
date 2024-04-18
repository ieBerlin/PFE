import { Suspense, useState } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { DUMMY_COACHES } from "../../dummy_data/dummy_coaches.js";
import Modal from "../modal/Modal.jsx";
import {
  AcademicCapIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { setModalType } from "../../features/modal/modalSlice.js";
export async function loader({ params }) {
  const { coachId } = params;
  return defer({
    timeOut: timeOut({ coachId }),
  });
}
const timeOut = ({ coachId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const coachData = DUMMY_COACHES.find(
        (coach) => coach.coachId === +coachId
      );
      if (coachData) {
        resolve(coachData);
      } else {
        reject(new Error("Coach not found"));
      }
    }, 0);
  });
};
const coachClasses = [
  {
    image: "https://example.com/image1.jpg",
    title: "Class 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis justo non tortor ultrices auctor.",
  },
  {
    image: "https://example.com/image2.jpg",
    title: "Class 2",
    description:
      "Phasellus consequat feugiat nulla at pharetra. Nulla facilisi. Cras sagittis placerat nisl, at efficitur libero fermentum id.",
  },
  {
    image: "https://example.com/image3.jpg",
    title: "Class 3",
    description:
      "Integer non dolor lacus. Vivamus at mi justo. Aliquam pretium diam et nulla accumsan, quis porttitor lacus placerat.",
  },
  {
    image: "https://example.com/image4.jpg",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque at reiciendis voluptatibus accusamus temporibus dolor et facilis voluptatem commodi nihil tempore iste corrupti autem nobis ea, sint amet ducimus exercitationem.,",
    description:
      "Fusce ut ligula eu quam aliquam malesuada. Sed vitae dolor sit amet est bibendum vestibulum.",
  },
];

export default function App() {
  const { timeOut } = useLoaderData();
  const [currentTab, setCurrentTab] = useState(1);
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState(null);
  return (
    <>
      <Modal imageSrc={imageSrc} />
      <div className="bg-white-100">
        <Suspense fallback={<FallbackText />}>
          <Await resolve={timeOut}>
            {(loadedEvents) => {
              const {
                coachName,
                coachEmail,
                coachExperience,
                coachLevel,
                coachCategory,
                totalTrainedMembers,
                coachContact,
              } = loadedEvents;
              let sideContent =
                currentTab === 1 ? (
                  <div className="px-4 font-medium text-gray-900 text-center mt-2 tracking-wide">
                    {/*Biography */}
                    <p>
                      John Doe is a passionate fitness coach with 5 years of
                      experience. Specializing in fitness training, he creates
                      personalized programs to help clients achieve their goals.
                      John's approach is holistic, focusing on strength, cardio,
                      flexibility, and nutrition. With his supportive and
                      motivating style, he guides clients towards a healthier
                      lifestyle.
                      <h1 className="text-start font-bold text-black ml-2 text-xl mt-2">
                        Certification
                      </h1>
                      <div
                        className="grid my-2 gap-2 items-center"
                        style={{
                          gridTemplateColumns:
                            "repeat(auto-fit,minmax(150px,1fr))",
                        }}
                      >
                        <button
                          onClick={() => {
                            setImageSrc(
                              "https://www.actfl.org/uploads/images/general/Opi-tester-certificate-sample.jpg"
                            ),
                              dispatch(setModalType("view-certification"));
                          }}
                        >
                          <img
                            src="https://www.actfl.org/uploads/images/general/Opi-tester-certificate-sample.jpg"
                            alt=""
                          />
                        </button>
                        <button
                          onClick={() => {
                            setImageSrc(
                              "https://international-hospitality-institute.myshopify.com/cdn/shop/products/CHGMCertificateSample.png?v=1613853914"
                            ),
                              dispatch(setModalType("view-certification"));
                          }}
                        >
                          <img
                            src="https://international-hospitality-institute.myshopify.com/cdn/shop/products/CHGMCertificateSample.png?v=1613853914"
                            alt=""
                          />
                        </button>
                        <button
                          onClick={() => {
                            setImageSrc(
                              "https://docs.moodle.org/2x/pl/images_pl/f/f8/elis_coursecertificate_example.png"
                            ),
                              dispatch(setModalType("view-certification"));
                          }}
                        >
                          <img
                            src="https://docs.moodle.org/2x/pl/images_pl/f/f8/elis_coursecertificate_example.png"
                            alt=""
                          />
                        </button>
                      </div>
                    </p>
                  </div>
                ) : (
                  <div>
                    <ul
                      className="grid gap-2 mt-4 p-4"
                      style={{
                        gridTemplateColumns:
                          "repeat(auto-fit,minmax(200px,1fr))",
                      }}
                    >
                      {coachClasses.map((coach, index) => {
                        if (index < 3) {
                          return (
                            <li key={coach.index}>
                              <a href="">
                                <img
                                  className="w-full h-auto rounded-md"
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Room-education-classroom-children-library-students-1237486.jpg/800px-Room-education-classroom-children-library-students-1237486.jpg"
                                  alt=""
                                />
                                <h2 className="font-semibold my-1 text-ellipsis w-full text-nowrap overflow-hidden">
                                  {coach.title}
                                </h2>
                                <p className="font-medium  text-sm text-gray-500 text-nowrap text-ellipsis overflow-hidden">
                                  {coach.description}
                                </p>
                              </a>
                            </li>
                          );
                        }
                      })}
                    </ul>
                    <p key="3" className="text-center">
                      <a
                        to={`/classes/`}
                        className="bg-gray-400 text-white font-semibold px-10 py-1 text-xl rounded-md"
                      >
                        See All
                      </a>
                    </p>
                  </div>
                );
              return (
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
                      <h1 className="font-bold text-2xl">{coachName}</h1>
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
                        <p className=" text-gray-500 font-medium text-sm">
                          {coachLevel}
                        </p>
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

                    <div className="  bg-white ml-2 rounded-lg shadow-md py-5">
                      <ul className="flex justify-center py-1 text-sm font-medium text-center text-gray-500 ">
                        <li className="me-2">
                          <button
                            onClick={() => setCurrentTab(1)}
                            className={`${
                              currentTab === 1 ? "bg-gray-700 " : "bg-gray-400"
                            } uppercase inline-block px-4 py-3 text-white rounded-lg active`}
                          >
                            Introduction
                          </button>
                        </li>
                        <li className="me-2">
                          <button
                            onClick={() => setCurrentTab(2)}
                            className={`${
                              currentTab === 2 ? "bg-gray-700 " : "bg-gray-400"
                            } uppercase inline-block px-4 py-3 text-white rounded-lg active`}
                          >
                            Classes
                          </button>
                        </li>
                      </ul>
                      {sideContent}
                    </div>
                  </div>
                </div>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

function FallbackText() {
  return (
    <section className="py-4 px-6 bg-gray-100 flex h-full w-full flex-col">
      <h1 className="font-bold text-2xl mb-3 text-black">Coach Detail Page</h1>
      <p className="text-gray-700 text-xl font-semibold text-center mt-7">
        Fetching Coach Details...
      </p>
    </section>
  );
}
