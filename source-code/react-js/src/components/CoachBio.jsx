import { useDispatch } from "react-redux";
import { coachClasses } from "../dummy_data/dummy_coaches";
import { setModalType } from "../features/modal/modalSlice";
import { useState } from "react";
import Modal from "./modal/Modal";
export default function CoachBio() {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(1);
  const [imageSrc, setImageSrc] = useState(null);
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const renderCertification = (imageUrl) => {
    setImageSrc(imageUrl);
    dispatch(setModalType("view-certification"));
  };

  return (
    <>
      <Modal imageSrc={imageSrc} />
      <Modal />
      <div className="bg-white ml-2 rounded-lg shadow-md py-5">
        <ul className="flex justify-center py-1 text-sm font-medium text-center text-gray-500">
          <li className="me-2">
            <button
              onClick={() => handleTabChange(1)}
              className={`${
                currentTab === 1 ? "bg-gray-700" : "bg-gray-400"
              } uppercase inline-block px-4 py-3 text-white rounded-lg active`}
            >
              Introduction
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => handleTabChange(2)}
              className={`${
                currentTab === 2 ? "bg-gray-700" : "bg-gray-400"
              } uppercase inline-block px-4 py-3 text-white rounded-lg active`}
            >
              Classes
            </button>
          </li>
        </ul>
        {currentTab === 1 ? (
          <div className="px-4 font-medium text-gray-900 text-center mt-2 tracking-wide">
            <p>
              John Doe is a passionate fitness coach with 5 years of experience.
              Specializing in fitness training, he creates personalized programs
              to help clients achieve their goals. John's approach is holistic,
              focusing on strength, cardio, flexibility, and nutrition. With his
              supportive and motivating style, he guides clients towards a
              healthier lifestyle.
            </p>
            <h1 className="text-start font-bold text-black ml-2 text-xl mt-2">
              Certification
            </h1>
            <div
              className="grid my-2 gap-2 items-center justify-center"
              style={{
                gridTemplateColumns: "repeat(auto-fill,200px)",
              }}
            >
              <button
                onClick={() =>
                  renderCertification(
                    "https://www.actfl.org/uploads/images/general/Opi-tester-certificate-sample.jpg"
                  )
                }
              >
                <img
                  src="https://www.actfl.org/uploads/images/general/Opi-tester-certificate-sample.jpg"
                  alt=""
                />
              </button>
              <button
                onClick={() =>
                  renderCertification(
                    "https://international-hospitality-institute.myshopify.com/cdn/shop/products/CHGMCertificateSample.png?v=1613853914"
                  )
                }
              >
                <img
                  src="https://international-hospitality-institute.myshopify.com/cdn/shop/products/CHGMCertificateSample.png?v=1613853914"
                  alt=""
                />
              </button>
              <button
                onClick={() =>
                  renderCertification(
                    "https://docs.moodle.org/2x/pl/images_pl/f/f8/elis_coursecertificate_example.png"
                  )
                }
              >
                <img
                  src="https://docs.moodle.org/2x/pl/images_pl/f/f8/elis_coursecertificate_example.png"
                  alt=""
                />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <ul
              className="grid gap-2 items-center justify-center mt-4 p-4"
              style={{
                gridTemplateColumns: "repeat(auto-fill,200px)",
              }}
            >
              {coachClasses.slice(0, 3).map((coach, index) => (
                <li key={index}>
                  <a href="">
                    <img
                      className="w-full h-auto rounded-md"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Room-education-classroom-children-library-students-1237486.jpg/800px-Room-education-classroom-children-library-students-1237486.jpg"
                      alt=""
                    />
                    <h2 className="font-semibold my-1 text-ellipsis w-full text-nowrap overflow-hidden">
                      {coach.title}
                    </h2>
                    <p className="font-medium text-sm text-gray-500 text-nowrap overflow-hidden">
                      {coach.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-center">
              <a
                href={`/classes/`}
                className="bg-gray-400 text-white font-semibold px-10 py-1 text-xl rounded-md"
              >
                See All
              </a>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
