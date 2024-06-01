import facebookLogo from "../../assets/facebook-176-svgrepo-com.svg";
import instagramLogo from "../../assets/instagram-svgrepo-com.svg";
import tiktokLogo from "../../assets/tiktok-svgrepo-com.svg";
import twitterLogo from "../../assets/twitter-154-svgrepo-com.svg";
import FooterLinkItem from "./FooterLinkItem";
import classes from "./Footer.module.css";
import FooterContentItem from "./FooterContentItem";

export default function Footer() {
  return (
    <>
      <div className={classes.footerBorder} />
      <footer className={classes.footer}>
        <hr className={classes.hr} />
        <div className={classes.socialNetworks}>
          <p className={classes.p}>
            Copyright &#169;2024 All right are reserved
          </p>
        
        </div>
      </footer>
    </>
  );
}
