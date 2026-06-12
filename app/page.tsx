import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { Showcase } from "@/components/marketing/showcase";
import { Services } from "@/components/marketing/services";
import { Gallery } from "@/components/marketing/gallery";
import { Pricing } from "@/components/marketing/pricing";
import { Footer } from "@/components/marketing/footer";
import { WhatsAppButton } from "@/components/marketing/whatsapp-button";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Showcase />
        <Services />
        <Gallery />
        <Pricing />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
