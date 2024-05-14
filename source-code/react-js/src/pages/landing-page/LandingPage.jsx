import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import FeaturesSection from "./FeaturesSection.jsx";
import Footer from "./Footer";
import Header from "./Header.jsx";
import HeroSection from "./HeroSection.jsx";
import { isAuthenticatedUser } from "../../hooks/http.js";

export default function LandingPage() {
  const isValidLogin = useRouteLoaderData("landing-page-id");
  console.log(isValidLogin);
  if (isValidLogin === null) {
    // LoaderData not yet available, show loading spinner or placeholder
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-blue-700">
      <Header isValidLogin={isValidLogin} />
      <HeroSection />
      <FeaturesSection />
      <Footer />
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
