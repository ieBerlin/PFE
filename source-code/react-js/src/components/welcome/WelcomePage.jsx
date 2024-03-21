import classes from "./WelcomePage.module.css";


import MainContent from "./MainContent.jsx"
import Footer from "./Footer";
import Header from "./Header.jsx";
export default function WelcomePage() {

  return (
    <div className={classes["main-background"]}>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
