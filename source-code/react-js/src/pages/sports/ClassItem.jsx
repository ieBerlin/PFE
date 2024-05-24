import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import kilterImage from "/kilter.jpg";
import classesStyles from "../../pages/classes/ClassesPage.module.css";
import {
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
export default function ClassItem({
  id,
  title,
  description,
  coachName,
  coachEmail,
  date,
  time,
  totalMembers,
  classCategory,
}) {
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

  const formattedTime = String(time).split(":").slice(0,2).join(':')
 
  return (
    <Link
      to={`/classes/${id}`}
      className={classesStyles.classItem + " shadow-lg"}
    >
      <div className={classesStyles.classImageContainer}>
        <img
          className={classesStyles.classImg}
          src="https://cdn.onefc.com/wp-content/uploads/2022/10/Zhang-Peimian-Jonathan-Di-Bella-ONE162-1920X1280-15.jpg"
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
              Coach: {coachName}
            </span>
          </button>
          {isDropDownActive && (
            <div
              onClick={(e) => {
                e.preventDefault();
                navigate("/coaches");
              }}
              className={`${instructorDropDownMenuClasses} shadow-sm bg-red-300 hover:bg-red-500`}
              onMouseOver={() => handleInstructorDropDown(true)}
              onMouseLeave={() => handleInstructorDropDown(false)}
            >
              <div className={classesStyles.coachInfos + " p-2"}>
                <img src={kilterImage} alt="coach avatar" />
                <div className="text-start">
                  <h2 className="text-black text-md font-medium">
                    {coachName}
                  </h2>
                  <h4 className="text-white text-sm">{coachEmail}</h4>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center px-2 py-3">
                <UserIcon className="w-5 h-5 text-white" />
                <p className="text-sm font-medium text-white text-nowrap inline-block">
                  Total trained members:{" "}
                  <p className="text-white inline-block">{totalMembers}</p>
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
