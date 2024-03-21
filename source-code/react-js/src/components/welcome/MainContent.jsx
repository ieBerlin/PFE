import arrowImage from "../../assets/left-arrow.png";
import checkedImage from "../../assets/grey-checked.png";
import premiumImage from "../../assets/premium.png";
import basicImage from "../../assets/basic.png";
import starterImage from "../../assets/starter.png";
import classes from "./WelcomePage.module.css";

export default function MainContent() {
  function onChange() {
    console.log("changed");
  }
  return (
    <main className={classes.main}>
      <div className={classes.membership}>
        <h2>Pricing Chart</h2>
        <h1>Choose Pricing package</h1>
        <h5>Unleash Your Potential: Choose Your Path Today</h5>
        <div className={classes.duration}>
          <span>Monthly</span>
          <label className={classes.switch}>
            <input type="checkbox" onChange={onChange} />
            <span className={`${classes.slider} ${classes.round}`}></span>
          </label>
          <span>Yearly</span>
        </div>
        <ul className={classes.packages}>
          <li className={classes.item}>
            <h3>
              BASIC <img src={basicImage} alt="basic image" />
            </h3>
            <ul>
              <li>
                <span>
                  <img src={checkedImage} alt="checked image" />
                </span>
                Unlimited Access to Home Club
              </li>
              <li>
                <span>
                  <img src={checkedImage} alt="checked image" />
                </span>
                Free Fitness Training
              </li>
              <li>
                <span>
                  <img src={checkedImage} alt="checked image" />
                </span>
                Free Training Session With The Club
              </li>
            </ul>
            <p>
              <span>$19</span> /Month
            </p>
            <hr />
            <button className={classes.arrow}>
              <span>Purchase Now</span>
              <img src={arrowImage} alt="arrow image" />
            </button>
          </li>
          <li className={classes.item}>
            <h3>
              STARTER <img src={starterImage} alt="starter image" />
            </h3>
            <ul>
              <li>
                <span>
                  <img src={checkedImage} alt="checked image" />
                </span>
                Unlimited Access to Home Club
              </li>
              <li>
                <span>
                  <img src={checkedImage} alt="checked image" />
                </span>
                Free Fitness Training
              </li>
              <li>
                <span>
                  <img src={checkedImage} alt="checked image" />
                </span>
                Free Training Session With The Club
              </li>
            </ul>
            <p>
              <span>$19</span> /Month
            </p>
            <hr />
            <button className={classes.arrow}>
              <span>Purchase Now</span>
              <img src={arrowImage} alt="arrow image" />
            </button>
          </li>
          <li className={classes.item}>
            <h3>
              PREMIUM <img src={premiumImage} alt="premium image" />
            </h3>
            <ul>
              <li>
                <span>
                  <img src={checkedImage} alt="checked image" />
                </span>
                Unlimited Access to Home Club
              </li>
              <li>
                <span>
                  <img src={checkedImage} alt="checked image" />
                </span>
                Free Fitness Training
              </li>
              <li>
                <span>
                  <img src={checkedImage} alt="checked image" />
                </span>
                Free Training Session With The Club
              </li>
            </ul>
            <p>
              <span>$19</span> /Month
            </p>
            <hr />
            <button className={classes.arrow}>
              <span>Purchase Now</span>
              <img src={arrowImage} alt="arrow image" />
            </button>
          </li>
        </ul>
      </div>
    </main>
  );
}
