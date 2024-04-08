import classes from "../classes/ClassesPage.module.css";
import arrowSvg from "../../assets/arrow-ios-forward-svgrepo-com.svg";
import { Link } from "react-router-dom";
export default function SportItem({ id, name, description }) {
  return (
    <li>
      <Link to={`/classes/${id}`} onClick={() => console.log(id)}>
        <img
          className={classes.sportImg}
          src="https://cdn.onefc.com/wp-content/uploads/2022/10/Zhang-Peimian-Jonathan-Di-Bella-ONE162-1920X1280-15.jpg"
          alt=""
        />
        <div className={classes.sportItemDetails}>
          <div className={classes.itemTitle}>
            {name}

            <img src={arrowSvg} alt="" />
          </div>
          <p>{description}</p>
        </div>
      </Link>
    </li>
  );
}
