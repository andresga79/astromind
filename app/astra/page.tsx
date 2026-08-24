import Starfield from "@/components/Starfield";
import AstraHero from "@/components/astra/AstraHero";
import AstraChannels from "@/components/astra/AstraChannels";
import AstraHowItWorks from "@/components/astra/AstraHowItWorks";
import AstraFeatures from "@/components/astra/AstraFeatures";
import AstraPricing from "@/components/astra/AstraPricing";
import AstraFaq from "@/components/astra/AstraFaq";
import AstraCta from "@/components/astra/AstraCta";

export default function AstraPage() {
  return (
    <>
      <Starfield />
      <main id="contenido">
        <AstraHero />
        <AstraChannels />
        <AstraHowItWorks />
        <AstraFeatures />
        <AstraPricing />
        <AstraFaq />
        <AstraCta />
      </main>
    </>
  );
}
