import classes from "./FeaturesSection.module.css";
export default function FeaturesSectionItem({ title, description }) {
  return (
    <li className={classes.item}>
      <div className={classes.itemContent}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </li>
  );
}
