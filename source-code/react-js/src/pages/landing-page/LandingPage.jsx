import { useRouteLoaderData } from "react-router-dom";
import FeaturesSection from "./FeaturesSection.jsx";
import Footer from "./Footer";
import Header from "./Header.jsx";
import HeroSection from "./HeroSection.jsx";
import { isAuthenticatedUser } from "../../hooks/http.js";
import landingPageImage from "../../assets/landingPageImage.jpg";

export default function LandingPage() {
  const isValidLogin = useRouteLoaderData("landing-page-id");
  if (isValidLogin === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${landingPageImage})` }}
      />
      <div className="relative z-10">
        <Header isValidLogin={isValidLogin} />
        <HeroSection />
        <FeaturesSection />
        <Footer />
      </div>
    </div>
  );
}

export async function loader() {
  const token = localStorage.getItem("user-token");

  if (!token) {
    return false;
  }

  return isAuthenticatedUser(token);
}
