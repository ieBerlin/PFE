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
    <>
      <div className={classes.footerBorder} />
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

        <hr className={classes.hr} />
        <div className={classes.socialNetworks}>
          <p className={classes.p}>
            Copyright &#169;2024 All right are reserved
          </p>
          <ul className={classes.networks}>
            <FooterLinkItem imgAlt="facebook image" imgSrc={facebookLogo} />
            <FooterLinkItem imgAlt="instagram image" imgSrc={instagramLogo} />
            <FooterLinkItem imgAlt="twitter image" imgSrc={twitterLogo} />
            <FooterLinkItem imgAlt="tiktok image" imgSrc={tiktokLogo} />
          </ul>
        </div>
      </footer>
    </>
  );
}
