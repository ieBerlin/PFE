import { Link, useParams } from "react-router-dom";
import { DUMMY_SPORTS } from "../../dummy_data/dummy_sports.js";
import { DUMMY_SUGGESTED_CLASSES } from "../../dummy_data/dummy_suggested_classes.js";
import classes from "./ClassDetailPage.module.css";
import brokenLinkSvg from "../../assets/broken-link-svgrepo-com.svg";
import arrowSvg from "../../assets/arrow-ios-forward-svgrepo-com.svg";
import SuggestedClassItem from "./SuggestedClassItem.jsx";
export default function ClassDetailsPage() {
  const { classId } = useParams();
  const sport = DUMMY_SPORTS.find((sport) => sport.id === +classId);

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
        <div className={classes.sportDetails}>
          <div>
            <h1>{sport.name}</h1>
            <p>{sport.description}</p>
          </div>
          <img
            src="https://cdn.onefc.com/wp-content/uploads/2022/10/Zhang-Peimian-Jonathan-Di-Bella-ONE162-1920X1280-15.jpg"
            alt=""
          />
        </div>

        <div className={classes.relatedClasses}>
          <h2>Related classes</h2>
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
      </div>
    );
  }

  return <section className={classes.sectionContainer}>{content}</section>;
}
