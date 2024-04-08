import classes from "./CoachesPage.module.css";
import { DUMMY_COACHES } from "../../dummy_data/dummy_coaches.js";
import calenderSvg from "../../assets/event-calender-date-note-svgrepo-com.svg";
import levelSvg from "../../assets/level-two-svgrepo-com.svg";
import peopleSvg from "../../assets/friend-group-members-svgrepo-com.svg";
import { Link } from "react-router-dom";
export default function CoachesPage() {
  return (
    <section className={classes.sectionContainer}>
      <h1>All coaches</h1>
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
                    Coach exprience :<span>{coach.coachExperience}</span>
                  </p>
                </div>
                <div className={classes.coachLevel}>
                  <img src={levelSvg} alt="" />
                  <p>
                    level :<span>{coach.coachLevel}</span>
                  </p>
                </div>
                <div className={classes.totalTrainedMembers}>
                  <img src={peopleSvg} alt="" />
                  <p>
                    Total trained members :
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
