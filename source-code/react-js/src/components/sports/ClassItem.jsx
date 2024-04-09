import classes from "../classes/ClassesPage.module.css";
import arrowSvg from "../../assets/arrow-ios-forward-svgrepo-com.svg";
import { Link, useNavigate } from "react-router-dom";

export default function ClassItem({ id, name, description }) {
  const navigate = useNavigate();

  const handleInstructorButtonClick = (event) => {
    event.preventDefault(); 
    navigate("/fds");
  };

  return (
    <Link to={`/classes/${id}`} className={classes.classItem}>
      <div className={classes.classImageContainer}>
        <img
          className={classes.classImg}
          src="https://cdn.onefc.com/wp-content/uploads/2022/10/Zhang-Peimian-Jonathan-Di-Bella-ONE162-1920X1280-15.jpg"
          alt=""
        />
        <span className={classes.classCategory}>Fitness</span>
        <span className={classes.classDuration}>15 min</span>
      </div>
      <div className={classes.classItemDetails}>
        <div className={classes.itemTitle}>
          {name}
          <span>20-10-2024 / 14:00</span>
        </div>
        <button
          className={classes.instructor}
          onClick={handleInstructorButtonClick}
        >
          INSTRUCTOR NAME
        </button>
        <p className={classes.classDescription}>{description}</p>
      </div>
    </Link>
  );
}
