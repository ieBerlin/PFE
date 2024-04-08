import classes from "./CoachesPage.module.css";
import { DUMMY_COACHES } from "../../dummy_data/dummy_coaches.js";
import calenderSvg from "../../assets/event-calender-date-note-svgrepo-com.svg";
import levelSvg from "../../assets/level-two-svgrepo-com.svg";
import peopleSvg from "../../assets/friend-group-members-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CoachesPage() {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  const toggleButtonClick = () => {
    setIsDropDownVisible((prevState) => !prevState);
  };

  const dropdownMenuStyles = isDropDownVisible
    ? `${classes.dropdownMenu} ${classes.visible}`
    : `${classes.dropdownMenu} ${classes.hidden}`;

  return (
    <section className={classes.sectionContainer}>
      <h1>All coaches</h1>
      <div className={classes.filterSection}>
        <button onClick={toggleButtonClick}>Recent</button>
        <div className={dropdownMenuStyles}>
          <h3>All categories</h3>
          <ul>
            <li>
              <p>Kickboxing</p>
              <input type="checkbox" name="sports-categories" id="" />
            </li>
            <li>
              <p>Fitness</p>
              <input type="checkbox" name="sports-categories" id="" />
            </li>
            <li>
              <p>Cardio</p>
              <input type="checkbox" name="sports-categories" id="" />
            </li>
            <li>
              <p>Bodybuilding</p>
              <input type="checkbox" name="sports-categories" id="" />
            </li>
          </ul>
          <h3>Experience level</h3>
          <ul>
            <li>
              <p>Medium</p>
              <input type="checkbox" name="experience-level" id="" />
              <p>Advanced</p>
              <input type="checkbox" name="experience-level" id="" />
            </li>
          </ul>
        </div>
      </div>
      <ul className={classes.coachLists}>
        {DUMMY_COACHES.map((coach) => (
          <li key={coach.coachId} className={classes.itemContainer}>
            <Link to={`/coaches/${coach.coachId}`}>
              <div className={classes.coachDetails}>
                <img
                  src="https://neweralive.na/storage/images/2023/may/lloyd-sikeba.jpg"
                  alt=""
                />
                <div className={classes.coachInfo}>
                  <div className={classes.emailSection}>
                    <h3>{coach.coachName}</h3>
                    <span>{coach.coachCategory}</span>
                  </div>
                  <p>{coach.coachEmail}</p>
                </div>
              </div>
              <hr />
              <div className={classes.coachCareer}>
                <div className={classes.coachExperience}>
                  <img src={calenderSvg} alt="" />
                  <p>
                    Coach experience: <span>{coach.coachExperience}</span>
                  </p>
                </div>
                <div className={classes.coachLevel}>
                  <img src={levelSvg} alt="" />
                  <p>
                    Level: <span>{coach.coachLevel}</span>
                  </p>
                </div>
                <div className={classes.totalTrainedMembers}>
                  <img src={peopleSvg} alt="" />
                  <p>
                    Total trained members:{" "}
                    <span>{coach.totalTrainedMembers}</span>
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
