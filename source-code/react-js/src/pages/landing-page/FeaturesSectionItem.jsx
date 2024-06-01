import svg from "../../assets/24-hours-service-svgrepo-com.svg";
import classes from "./FeaturesSection.module.css";
export default function FeaturesSectionItem({ title, description }) {
  return (
    <li className={classes.item}>
      <img src={svg} className={classes.featureItemIcon} alt="" />
      <div className={classes.itemContent}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </li>
  );
}
