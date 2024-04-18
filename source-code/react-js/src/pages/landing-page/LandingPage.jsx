import FeaturesSection from "./FeaturesSection.jsx";
import Footer from "./Footer";
import Header from "./Header.jsx";
import HeroSection from "./HeroSection.jsx";
export default function LandingPage() {
  return (
    <div className="bg-blue-700">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
