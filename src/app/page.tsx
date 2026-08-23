import { CinematicScrollHero } from "@/components/hero/CinematicScrollHero";
import { Manifesto } from "@/components/hero/Manifesto";
import { CreativeCore } from "@/components/production/CreativeCore";
import { ProcessTimeline } from "@/components/culture/ProcessTimeline";
import { TeamGallery } from "@/components/culture/TeamGallery";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { ClientMarquee } from "@/components/cases/ClientMarquee";

export default function HomePage() {
  return (
    <>
      <CinematicScrollHero />
      <Manifesto />
      <CreativeCore />
      <ClientMarquee />
      <ProcessTimeline />
      <TeamGallery />
      <ContactCTA />
    </>
  );
}
