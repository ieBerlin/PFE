import { Link, useParams } from "react-router-dom";
import { DUMMY_CLASSES } from "../../dummy_data/dummy_classes.js";
import { DUMMY_SUGGESTED_CLASSES } from "../../dummy_data/dummy_suggested_classes.js";
import classes from "./ClassDetailPage.module.css";
import brokenLinkSvg from "../../assets/broken-link-svgrepo-com.svg";
import arrowSvg from "../../assets/arrow-ios-forward-svgrepo-com.svg";
import SuggestedClassItem from "./SuggestedClassItem.jsx";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
export default function ClassDetailsPage({
  classId,
  title,
  description,
  coachName,
  coachEmail,
  date = "02-03-2023",
  time = "05:00 PM - 06:00 PM",
  totalEnrolledMembers,
  availablePlaces,
  classCategory,
  price,
}) {
  classId = 10;
  title =
    "Build muscle and increase strength with our weightlifting class, Build muscle and increase strength with our weightlifting class, Build muscle and increase strength with our weightlifting class,Build muscle and increase strength with our weightlifting class Build muscle and increase strength with our weightlifting class.";
  description =
    "Build muscle and increase strength with our weightlifting class, Build muscle and increase strength with our weightlifting class, Build muscle and increase strength with our weightlifting class,Build muscle and increase strength with our weightlifting class Build muscle and increase strength with our weightlifting class.";
  coachName = "Alex Johnson";
  coachEmail = "alex@example.com";
  const sport = DUMMY_CLASSES.find((sport) => sport.id === +classId);

  let content;
  if (!sport) {
    content = (
      <div className={classes.notFoundContainer}>
        <img src={brokenLinkSvg} alt="" />
        <h1>Sport Not Found</h1>
        <p>Sorry, the sport you are looking for cannot be found.</p>
        <p>Please check the URL or try navigating back to classes page.</p>
        <Link to="/classes">
          <div className={classes.backButton}>
            <p> Go back to classes page</p>
            <img src={arrowSvg} alt="" />
          </div>
        </Link>
      </div>
    );
  } else {
    content = (
      <div className={classes.sportContainer}>
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: "1fr auto",
          }}
        >
          <div className="">
            <h1 className="text-black font-semibold text-xl tracking-wider capitalize mb-4">
              {title}
            </h1>
            <p className="text-gray-800 font-medium text-lg">{description}</p>
          </div>
          <div>
            <img
              src="https://cdn.onefc.com/wp-content/uploads/2022/10/Zhang-Peimian-Jonathan-Di-Bella-ONE162-1920X1280-15.jpg"
              alt=""
            />
            <div className="flex flex-row justify-between items-center my-2 gap-1 text-center">
              <div className="w-full flex flex-row items-center gap-2 justify-center bg-gray-100 p-2 rounded-md">
                <CalendarIcon className="w-5 h-5 text-gray-600" />
                <p className="text-gray-600 text-sm font-medium">{date}</p>
              </div>
              <div className="flex flex-row items-center gap-2 justify-center bg-gray-100 p-2 rounded-md whitespace-nowrap">
                <ClockIcon className="w-5 h-5 text-gray-600" />
                <p className="text-gray-600 text-sm font-medium">{time}</p>
              </div>
            </div>
            <div>
              <span className="font-medium text-lg text-gray-900">With: </span>
              <a href="" className="font-medium text-md text-gray-700">
                {" "}
                ieBerlin
              </a>
            </div>
          </div>
        </div>
        <div className="my-3 w-full flex justify-center">
          {" "}
          <button
            type="submit"
            className={`my-3 mx-auto w-min whitespace-nowrap  bg-blue-600
              text-white py-2 px-8 rounded-lg font-bold 
              hover:bg-blue-500
         `}
          >
            Enroll Now
          </button>
        </div>
        <div className={classes.relatedClasses}>
          <h2 className="font-semibold text-lg text-gray-900">Related Classes</h2>
          <ul>
            {DUMMY_SUGGESTED_CLASSES.map((DUMMY_SUGGESTED_CLASS) => (
              <SuggestedClassItem
                key={DUMMY_SUGGESTED_CLASS.id}
                title={DUMMY_SUGGESTED_CLASS.title}
                description={DUMMY_SUGGESTED_CLASS.description}
              />
            ))}
          </ul>

          <div className={classes.allClassesButton}>
            <Link to="">See all classes</Link>
          </div>
        </div>
        <div className={classes.relatedClasses}>
          <h2>Related coaches</h2>
          <ul>
            {DUMMY_SUGGESTED_CLASSES.map((DUMMY_SUGGESTED_CLASS) => (
              <SuggestedClassItem
                key={DUMMY_SUGGESTED_CLASS.id}
                title={DUMMY_SUGGESTED_CLASS.title}
                description={DUMMY_SUGGESTED_CLASS.description}
              />
            ))}
          </ul>
          <div className={classes.allClassesButton}>
            <Link to="">See all coaches</Link>
          </div>
        </div>
      </div>
    );
  }

  return <section className={classes.sectionContainer}>{content}</section>;
}
