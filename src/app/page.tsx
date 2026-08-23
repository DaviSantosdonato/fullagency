import { CinematicScrollHero } from "@/components/hero/CinematicScrollHero";
import { Manifesto } from "@/components/hero/Manifesto";
import { CreativeCore } from "@/components/production/CreativeCore";
import { CaseShowcase } from "@/components/cases/CaseShowcase";
import { ProcessTimeline } from "@/components/culture/ProcessTimeline";
import { TeamGallery } from "@/components/culture/TeamGallery";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { featuredCases } from "@/content/cases";

export default function HomePage() {
  return (
    <>
      <CinematicScrollHero />
      <Manifesto />
      <CreativeCore />
      <CaseShowcase cases={featuredCases} />
      <ProcessTimeline />
      <TeamGallery />
      <ContactCTA />
    </>
  );
}
