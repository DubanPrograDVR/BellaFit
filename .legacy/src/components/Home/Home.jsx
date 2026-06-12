import "./styles/globals.css";
import Footer from "./Footer";
import Gallery from "./Gallery";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import Pricing from "./Pricing";
import Services from "./Services";
import Showcase from "./Showcase";
import WhatsAppButton from "./WhatsAppButton";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Showcase />
      <Gallery />
      <Pricing />
      <Services />
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Home;
