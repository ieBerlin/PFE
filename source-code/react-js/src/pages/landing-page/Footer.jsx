import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <>
        <hr className={classes.hr} />
      <div className={classes.footerBorder} />
      <footer className={classes.footer}>
        <div className={classes.socialNetworks}>
          <p className={classes.p}>
            Copyright &#169;2024 All right are reserved
          </p>
        
        </div>
      </footer>
    </>
  );
}
