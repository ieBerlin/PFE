import classes from "./WelcomePage.module.css";
import facebookLogo from "../../assets/facebook.png";
import instagramLogo from "../../assets/instagram.png";
import twitterLogo from "../../assets/twitter.png";
import tiktokLogo from "../../assets/tiktok.png";
export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes["quick-links"]}>
        <ul>
          <li>
            <h2>Membership</h2>
            <a href="">Pricing</a>
          </li>
          <li>
            <h2>Classes</h2>
            <a href="">Schedule</a>
            <a href="">Virtual Classes</a>
          </li>
          <li>
            <h2>Personal Training</h2>
            <a href="">Our Trainers</a>
            <a href="">Programs</a>
          </li>
          <li>
            <h2>Contact Us</h2>
            <p>+21365390323123</p>
            <a href="mailto:ieBerlin7@gmail.com">ieBerlin7@gmail.com</a>
          </li>
        </ul>
      </div>
      <hr className={classes.hr} />
      <div className={classes["social-network"]}>
        <p className={classes.p}>Copyright &#169;2024 All right are reserved</p>
        <ul className={classes.networks}>
          <li>
            <img src={facebookLogo} alt="facebook logo" />
          </li>
          <li>
            <img src={twitterLogo} alt="twitter logo" />
          </li>
          <li>
            <img src={instagramLogo} alt="instagram logo" />
          </li>
          <li>
            <img src={tiktokLogo} alt="tiktok logo" />
          </li>
        </ul>
      </div>
    </footer>
  );
}
