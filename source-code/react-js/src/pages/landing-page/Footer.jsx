import facebookLogo from "../../assets/facebook-176-svgrepo-com.svg";
import instagramLogo from "../../assets/instagram-svgrepo-com.svg";
import tiktokLogo from "../../assets/tiktok-svgrepo-com.svg";
import twitterLogo from "../../assets/twitter-154-svgrepo-com.svg";
import FooterLinkItem from "./FooterLinkItem";
import classes from "./Footer.module.css";
import FooterContentItem from "./FooterContentItem";
const membershipLinks = [
  { id: 1, title: "Sign Up", url: "/signup" },
  { id: 2, title: "Login", url: "/login" },
  { id: 3, title: "Profile", url: "/profile" },
  { id: 4, title: "Settings", url: "/settings" },
  { id: 5, title: "Logout", url: "/logout" },
];

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <ul className={classes.footerLinks}>
          <FooterContentItem
            classes={classes.footerContentLink}
            title="About US"
            links={membershipLinks}
          />
          <FooterContentItem
            classes={classes.footerContentLink}
            title="Contact US"
            links={membershipLinks}
          />
          <FooterContentItem
            classes={classes.footerContentLink}
            title="Other links"
            links={membershipLinks}
          />
          <FooterContentItem
            classes={classes.footerContentLink}
            title="Membership"
            links={membershipLinks}
          />
        </ul>
      </div>
      {/* <div className={classes["quick-links"]}>
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
      </div> */}
      <hr className={classes.hr} />
      <div className={classes.socialNetworks}>
        <p className={classes.p}>Copyright &#169;2024 All right are reserved</p>
        <ul className={classes.networks}>
          <FooterLinkItem imgAlt="facebook image" imgSrc={facebookLogo} />
          <FooterLinkItem imgAlt="instagram image" imgSrc={instagramLogo} />
          <FooterLinkItem imgAlt="twitter image" imgSrc={twitterLogo} />
          <FooterLinkItem imgAlt="tiktok image" imgSrc={tiktokLogo} />
        </ul>
      </div>
    </footer>
  );
}
