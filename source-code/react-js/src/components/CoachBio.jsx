import { useState } from "react";
import Modal from "./modal/Modal";
export default function CoachBio({ coachData }) {
  const [currentTab, setCurrentTab] = useState(1);
  const [selectedCertification, setSelectedCertification] = useState(null);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const renderCertification = (imageUrl) => {
    setSelectedCertification(imageUrl);
  };

  return (
    <>
      <Modal imageSrc={selectedCertification} />
      <div className="bg-white ml-2 rounded-lg shadow-md py-5">
        <ul className="flex justify-center py-1 text-sm font-medium text-center text-gray-500">
          <TabButton
            index={1}
            currentTab={currentTab}
            onClick={() => handleTabChange(1)}
            label="Introduction"
            />
          <TabButton
            index={2}
            currentTab={currentTab}
            onClick={() => handleTabChange(2)}
            label="Classes"
          />
        </ul>
        {currentTab === 1 ? (
          <div className="px-4 font-medium text-gray-900 text-center mt-2 tracking-wide">
            <p>{coachData.bio}</p>
            <h1 className="text-start font-bold text-black ml-2 text-xl mt-2">
              Certification
            </h1>
            <div
              className="grid my-2 gap-2 items-center justify-center"
              style={{
                gridTemplateColumns: "repeat(auto-fill,200px)",
              }}
            >
              {coachData.certificationsImages &&
                coachData.certificationsImages.map(
                  (certificationImage, index) => (
                    <CertificationItem
                      key={index}
                      imageUrl={certificationImage}
                      onClick={() => renderCertification(certificationImage)}
                    />
                  )
                )}
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
              {coachData.classes.slice(0, 3).map((coachClass, index) => (
                <li key={index}>
                  <a href={coachClass.href}>
                    <img
                      className="w-full h-auto rounded-md"
                      src={coachClass.img}
                      alt=""
                    />
                    <h2 className="font-semibold my-1 text-ellipsis w-full text-nowrap overflow-hidden">
                      {coachClass.title}
                    </h2>
                    <p className="font-medium text-sm text-gray-500 text-nowrap overflow-hidden">
                      {coachClass.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-center">
              <a
                href={`/classes/`}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-10 py-1 text-xl rounded-md"
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
const TabButton = ({ currentTab, onClick, label,index }) => {
  return (
    <li className="me-2">
      <button
        onClick={onClick}
        className={`${
          currentTab === index ? "bg-gray-700" : "bg-gray-400"
        } uppercase inline-block px-4 py-3 text-white rounded-lg active`}
      >
        {label}
      </button>
    </li>
  );
};
const CertificationItem = ({ imageUrl, onClick }) => {
  return (
    <button onClick={onClick}>
      <img src={imageUrl} alt="Certification" className="w-full h-auto rounded-md" />
    </button>
  );
};