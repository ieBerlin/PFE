import classes from "./WelcomePage.module.css";
import MainContentDescription from "./MainContentDescription.jsx"
// import MainContent from "./MainContent.jsx"
import MainContentCertification from "./MainContentCertification.jsx"
import MainContent from "./MainContent.jsx"
import Footer from "./Footer";
import Header from "./Header.jsx";
export default function WelcomePage() {

  return (
    <div className={classes["main-background"]}>
      <Header />
      <MainContentCertification/>
      <MainContentDescription/>
      <MainContent />
      <Footer />
    </div>
  );
}
