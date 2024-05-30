import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classesStyles from "../../pages/classes/ClassesPage.module.css";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckBadgeIcon,
  ChevronRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
export default function ClassItem({ data }) {
  const {
    image: instructorImage,
    classId: id,
    name: title,
    description,
    instructor_email: coachEmail,
    startDate: date,
    startTime: time,
    instructor_extra_info,
    category: classCategory,
    status: classStatus,
  } = data;

  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const navigate = useNavigate();

  const handleInstructorDropDown = (value) => {
    setIsDropDownActive(value);
  };

  const handleInstructorButtonClick = (e) => {
    e.preventDefault();
  };

  let instructorDropDownMenuClasses = classesStyles.instructorDropDownMenu;
  if (isDropDownActive) {
    instructorDropDownMenuClasses += ` ${classesStyles.active}`;
  }
  const isAdmin = useSelector(
    (state) => state.userRole.userRole?.toLowerCase() === "admin"
  );
  const formattedDate = new Date(date).toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
console.log(instructor_extra_info)
  const formattedTime = String(time).split(":").slice(0, 2).join(":");
  const coachImage = instructor_extra_info?.image
    ? "http://localhost:8081/uploads/images/profile/" +
      instructor_extra_info.image
    : "http://localhost:8081/uploads/images/sport/coach.jpg";
  return (
    <Link
      to={`/classes/${id}`}
      className={classesStyles.classItem + " shadow-lg"}
    >
      <div className={classesStyles.classImageContainer}>
        <img
          className={classesStyles.classImg}
          src={`http://localhost:8081/uploads/images/sport/${classCategory}.jpg`}
          alt=""
        />
        <span className={classesStyles.classCategory}>{classCategory}</span>
        <span className={classesStyles.classDuration}>15 min</span>
      </div>
      <div className={classesStyles.classItemDetails}>
        <p className={classesStyles.itemTitle}>{title}</p>
        <div className="flex flex-row justify-between items-center my-2 gap-1 text-center">
          <div className="flex flex-row items-center gap-2 justify-center bg-gray-200 p-2 rounded-md w-full whitespace-nowrap">
            <CalendarIcon className="w-5 h-5 text-gray-600" />
            <p className="text-gray-600 text-sm">{formattedDate}</p>
          </div>
          <div className="flex flex-row items-center gap-2 justify-center bg-gray-200 p-2 rounded-md w-full whitespace-nowrap">
            <ClockIcon className="w-5 h-5 text-gray-600" />
            <p className="text-gray-600 text-sm">{formattedTime}</p>
          </div>
        </div>
        <div
          className={
            classesStyles.instructorDropDownMenuContainer + " text-center"
          }
        >
          <button
            onClick={handleInstructorButtonClick}
            onMouseOver={() => handleInstructorDropDown(true)}
            onMouseLeave={() => handleInstructorDropDown(false)}
          >
            <span className="w-full text-gray-500 font-medium py-2 px-0.5 md:px-0 hover:text-gray-700 cursor-pointer">
              Coach: {instructor_extra_info?.name}
            </span>
          </button>
          {isAdmin && (
            <h2 className="text-blue-900 font-semibold">
              {" "}
              Status :{" "}
              <span className="font-medium text-cyan-600">{classStatus}</span>
            </h2>
          )}
          {isDropDownActive && (
            <div
              onClick={(e) => {
                e.preventDefault();
                navigate("/coaches/" + instructor_extra_info?.coachId);
              }}
              className={`${instructorDropDownMenuClasses} shadow-sm bg-cyan-500 hover:bg-cyan-700`}
              onMouseOver={() => handleInstructorDropDown(true)}
              onMouseLeave={() => handleInstructorDropDown(false)}
            >
              <div className={classesStyles.coachInfos + " p-2"}>
                <img src={coachImage} alt="coach avatar" />
                <div className="text-start">
                  <h2 className="text-black text-md font-medium">
                  {instructor_extra_info?.name}
                  </h2>
                  <h4 className="text-white text-sm">{coachEmail}</h4>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center px-2 py-3">
                <UserIcon className="w-5 h-5 text-white" />
                <p className="text-sm font-medium text-white text-nowrap inline-block">
                  Total trained members:{" "}
                  <p className="text-stone-800 inline-block">
                    {instructor_extra_info?.totalTrainedMembers || "Unknown"}
                  </p>
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center px-2 py-3">
                <BriefcaseIcon className="w-5 h-5 text-white" />
                <p className="text-sm font-medium text-white text-nowrap inline-block">
                  Specialization:{" "}
                  <p className="text-stone-800 inline-block">
                    {instructor_extra_info?.specialization || "Unknown"}
                  </p>
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center px-2 py-3">
                <CheckBadgeIcon className="w-5 h-5 text-white" />
                <p className="text-sm font-medium text-white text-nowrap inline-block">
                  Experience Level:{" "}
                  <p className="text-stone-800 inline-block">
                    {instructor_extra_info?.experienceLevel || "Unknown"}
                  </p>
                </p>
              </div>
            </div>
          )}
        </div>
        {!isAdmin ? (
          <p
            className={
              classesStyles.classDescription +
              " shadow-xl text-stone-800 capitalize font-medium text-center"
            }
          >
            {description}
          </p>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/classes/edit/${id}`);
            }}
            className="my-2 w-full flex items-center justify-center rounded-md bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Edit Equipment <ChevronRightIcon className="ml-2  h-6 w-6" />
          </button>
        )}
      </div>
    </Link>
  );
}
