import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import FeaturesSection from "./FeaturesSection.jsx";
import Footer from "./Footer";
import Header from "./Header.jsx";
import HeroSection from "./HeroSection.jsx";

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
    // No token found, user is not logged in
    return false;
  }

  // Check token validity on the client side
  try {
    const response = await fetch(
      "http://localhost:8081/user/auth/verify-token",
      {
        method: "GET",

        headers: {
          // 'Content-Type':"application/json",
          "x-access-token": token,
        },
      }
    );

    if (!response.ok) {
      // Token verification failed, user is not logged in
      return false;
    }

    // Token is valid, user is logged in
    return true;
  } catch (error) {
    console.error("Error verifying token:", error);
    // Error occurred while verifying token, user may or may not be logged in
    return false;
  }
}
