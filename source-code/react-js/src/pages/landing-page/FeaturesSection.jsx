import classes from "./FeaturesSection.module.css";
import FeaturesSectionItem from "./FeaturesSectionItem";
export default function FeaturesSection() {
  return (
    <section className={classes.featuresSectionContainer}>
      <h3>TITLE</h3>
      <h1>What makes us different</h1>
      <p>
        Experience the power of our Gym Management System and unlock new
        possibilities for success in the fitness industry. Start your journey
        towards operational excellence and member satisfaction today.
      </p>
      <ul>
        <FeaturesSectionItem />
        <FeaturesSectionItem />
        <FeaturesSectionItem />
      </ul>
    </section>
  );
}
