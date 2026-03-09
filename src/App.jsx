import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";

import Header from "./Header";
import Home from "./Home";
import Features from "./Features";
import Projects from "./Projects";
import Resume from "./Resume";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Header />
      <Home />
      <Features />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
