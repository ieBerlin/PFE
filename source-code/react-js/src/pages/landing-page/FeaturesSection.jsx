import { useState } from "react";
import classes from "./FeaturesSection.module.css";
import arrowSvg from "../../assets/right-arrow-svgrepo-com.svg";
import logoSvg from "../../assets/instagram-svgrepo-com.svg";
const features = [
  {
    id: 1,
    title: "Membership Management",
    description:
      "Easily manage member registrations, subscriptions, renewals, and profiles.",
    key: "membership",
    icon: "fas fa-users",
  },
  {
    id: 2,
    title: "Class Scheduling",
    description:
      "Effortlessly schedule and manage fitness classes, sessions, and events.",
    key: "scheduling",
    icon: "fas fa-calendar-alt",
  },
  {
    id: 3,
    title: "Payment Processing",
    description:
      "Securely process payments, manage invoices, and track financial transactions.",
    key: "payment",
    icon: "fas fa-money-check-alt",
  },
];

const FeaturesSection = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const handleToggleFeatureToLeft = () => {
    setActiveFeatureIndex((prevIndex) =>
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
  };

  const handleToggleFeatureToRight = () => {
    setActiveFeatureIndex((prevIndex) =>
      prevIndex === features.length - 1 ? 0 : prevIndex + 1
    );
  };

  const content = (
    <FeatureCard
      onToggleLeft={handleToggleFeatureToLeft}
      onToggleRight={handleToggleFeatureToRight}
      icon={features[activeFeatureIndex].icon}
      title={features[activeFeatureIndex].title}
      description={features[activeFeatureIndex].description}
    />
  );

  return <section className="features-section">{content}</section>;
};

const FeatureCard = ({
  onToggleRight,
  onToggleLeft,
  icon,
  title,
  description,
}) => {
  return (
    <div className={classes.featureCardContainer}>
      <button onClick={onToggleRight}>
        {<img src={arrowSvg} alt="arrow svg" />}
      </button>
      <div className={classes.featureCard}>
        <h3 className={classes.title}>
          <img src={logoSvg} alt="arrow svg" />
          {title}
        </h3>
        <p className={classes.description}>{description}</p>
      </div>
      <button onClick={onToggleLeft}>
        {<img src={arrowSvg} alt="arrow svg" />}
      </button>
    </div>
  );
};

export default FeaturesSection;
