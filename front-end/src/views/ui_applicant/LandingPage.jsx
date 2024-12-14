import "./LandingPage.css";
import Home from "../../Landing/Home";
import About from "../../Landing/About";
import Work from "../../Landing/Work";
import Testimonial from "../../Landing/Testimonial";
import Contact from "../../Landing/Contact";
import Footer from "../../Landing/Footer";

function LandingPage() {
  return (
    <div className="App">
      <Home />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPage;
