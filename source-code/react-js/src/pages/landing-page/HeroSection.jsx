import classes from "./HeroSection.module.css";
import arrowSvg from "../../assets/right-arrow-svgrepo-com.svg";
export default function HeroSection() {
  return (
    <main>
      <div className={classes.heroSection}>
        <h1>Discover the Power of Fitness at Our Gym</h1>
      </div>
      <div className={classes.buttons}>
        <a href="">
          <button>Get Started </button>
          <img src={arrowSvg} alt="arrow svg" />
        </a>
        <a href="">
          <button>See how it works</button>{" "}
          <img src={arrowSvg} alt="arrow svg" />
        </a>
      </div>
    </main>
  );
}
