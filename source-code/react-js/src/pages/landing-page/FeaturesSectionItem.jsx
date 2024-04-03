import svg from "../../assets/24-hours-service-svgrepo-com.svg";
import classes from "./FeaturesSection.module.css";
export default function FeaturesSectionItem() {
  return (
    <li className={classes.item}>
      <img src={svg} className={classes.featureItemIcon} alt="" />
      <div className={classes.itemContent}>
        <h2>title</h2>
        <p>
          Securely process payments and manage financial transactions with
          confidence. Our integrated payment processing solution offers
          flexibility and convenience, enabling hassle-free billing, invoicing,
          and revenue tracking.
        </p>
      </div>
    </li>
  );
}
