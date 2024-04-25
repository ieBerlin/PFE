import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import kilter from "/kilter.jpg";
import classes from "../../pages/classes/ClassesPage.module.css";

export default function ClassItem({ id, name, description }) {
  const navigate = useNavigate();
  const [isDropDownActive, setIsDropDownActive] = useState(false);

  const handleInstructorDropDown = (value) => {
    setIsDropDownActive(value);
  };

  const handleInsctructorButtonClick = (e) => {
    e.preventDefault();
  };
  let instructorDropDownMenuClasses = classes.instructorDropDownMenu ;
  if(isDropDownActive){
    instructorDropDownMenuClasses += ` ${classes.active}`
  }
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
        <p className={classes.itemTitle}>
          {name} <span>20-10-2024 / 14:00</span>
        </p>
        <div className={classes.instructorDropDownMenuContainer}>
          <button
            className={classes.instructor}
            onClick={handleInsctructorButtonClick}
            onMouseOver={() => handleInstructorDropDown(true)}
            onMouseLeave={() => handleInstructorDropDown(false)}
          >
            INSTRUCTOR NAME
          </button>
          {isDropDownActive && (
            <div
              className={instructorDropDownMenuClasses}
              onMouseOver={() => handleInstructorDropDown(true)}
              onMouseLeave={() => handleInstructorDropDown(false)}
            >
              <div className={classes.coachInfos}>
                <img src={kilter} alt="user avatar" />
                <div className={classes.coachContact}>
                  <h2>COACH NAME</h2>
                  <h4>COACH_EMAIL</h4>
                </div>
              </div>
              <div className={classes.coachExtraDetails}>
                <p>TOTAL TRAINED MEMEBERS</p>
              </div>
            </div>
          )}
        </div>
        <p className={classes.classDescription}>{description}</p>
      </div>
    </Link>
  );
}
