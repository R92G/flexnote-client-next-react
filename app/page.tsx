import { Navbar } from "./components/Navbar";
import Image from "next/image";
import { Hero } from "./components/Hero";
import { Sponsors } from "./components/Sponsors";
import { About } from "./components/About";
import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { Services } from "./components/Services";
import { Cta } from "./components/Cta";
import { Testimonials } from "./components/Testimonials";
import { Team } from "./components/Team";
import { Pricing } from "./components/Pricing";
import { Newsletter } from "./components/Newsletter";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const currentUser = session?.user;
  return (
    <>
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks currentUser={currentUser} />
      <Features />
      {/* <Services /> */}
      <Cta currentUser={currentUser} />
      <Testimonials />
      {/* <Team /> */}
      <Pricing currentUser={currentUser} />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}
