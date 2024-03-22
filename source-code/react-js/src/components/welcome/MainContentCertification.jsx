import classes from "./MainContentCertification.module.css";
import trainer from "../../assets/trainer.jfif";
export default function MainContentCertification() {
  return (
    <main className={classes.main}>
      <h1>TRAINING & CERTIFICATION COURSES</h1>
      <ul className={classes.ul}>
        <li>
          <img src={trainer} alt="" />
          <div className={classes["elementor-background-overlay"]}>
            <p>EARN YOUR CREDENTIAL AS A</p>
            <h1>CERTIFIED MASTER PERSONAL TRAINER</h1>
            <a>LEARN MORE</a>
          </div>
        </li>
        <li>
          <img src={trainer} alt="" />
          <div className={classes["elementor-background-overlay"]}>
            <p>EARN YOUR CREDENTIAL AS A</p>
            <h1>CERTIFIED MASTER PERSONAL TRAINER</h1>
            <a>LEARN MORE</a>
          </div>
        </li>
        <li>
          <img src={trainer} alt="" />
          <div className={classes["elementor-background-overlay"]}>
            <p>EARN YOUR CREDENTIAL AS A</p>
            <h1>CERTIFIED MASTER PERSONAL TRAINER</h1>
            <a>LEARN MORE</a>
          </div>
        </li>
      </ul>
    </main>
  );
}
