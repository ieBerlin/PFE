import classes from "./MainContentDescription.module.css";
import icon1 from "../../assets/icon1.webp";
export default function MainContentDescription() {
  return (
    <main className={classes.main}>
      <h2>TRUSTED BY 50,000+ TRAINERS & COACHES GLOBALLY</h2>
      <h1>
        Here’s why <span>NESTA</span> is for you
      </h1>
      <ul className={classes.images}>
        <li>
          <img src={icon1} alt="icon 1" />
          <p>100% ONLINE, EASILY ACCESSIBLE</p>
        </li>
        <li>
          <img src={icon1} alt="icon 1" />
          <p>100% ONLINE, EASILY ACCESSIBLE</p>
        </li>
        <li>
          <img src={icon1} alt="icon 1" />
          <p>100% ONLINE, EASILY ACCESSIBLE</p>
        </li>
        <li>
          <img src={icon1} alt="icon 1" />
          <p>100% ONLINE, EASILY ACCESSIBLE</p>
        </li>
        <li>
          <img src={icon1} alt="icon 1" />
          <p>100% ONLINE, EASILY ACCESSIBLE</p>
        </li>
      </ul>
    </main>
  );
}
