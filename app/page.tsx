import NewsLetter from "@/components/pinky-news-letter";
import BrandIntroSection from "@/components/brand-intro-section";
import BridviaServiceSection from "@/components/bridvia-service-section";
import BridviaPhase2Section from "@/components/bridvia-phase2-section";
import CallToActionSection from "@/components/call-to-action-section";
import FooterSection from "@/components/footer";
import ScrollAIPanel from "@/components/scroll-ai-panel";

export default function Home() {
  return (
    <>
      <div data-first-section>
        <NewsLetter />
      </div>
      <BrandIntroSection />
      <BridviaServiceSection />
      <CallToActionSection />
      <BridviaPhase2Section />
      <FooterSection />
      <ScrollAIPanel userLocation="main" />
    </>
  );
}
