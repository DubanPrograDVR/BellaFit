import "./styles/globals.css";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import Services from "./Services";
import WhatsAppButton from "./WhatsAppButton";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhatsAppButton />
      <Services />
      <Footer />
    </>
  );
};

export default Home;
