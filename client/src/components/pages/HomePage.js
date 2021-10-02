import { Route } from "react-router-dom";
import NavBar from "../subComponents/HomePage/NavBar";
import HeroSection from "../subComponents/HomePage/HeroSection";
import Actualite from "../subComponents/HomePage/Actualite";
import Lecole from "../subComponents/HomePage/Lecole";
import ContactUs from "../subComponents/HomePage/ContactUs";
import Footer from "../subComponents/HomePage/Footer";

function HomePage() {
  return (
    <Route  path="/">
      <NavBar />
      <HeroSection />
      <Actualite />
      <Lecole />
      <ContactUs />
      <Footer />
    </Route>
  );
}

export default HomePage;
