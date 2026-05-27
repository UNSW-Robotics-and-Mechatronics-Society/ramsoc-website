import AboutSection from "./_components/AboutSection";
import CookingPot from "./_components/CookingPot";
import HeroSection from "./_components/HeroSection";
import HobbiesSection from "./_components/HobbiesSection";
import ProjectsSection from "./_components/ProjectsSection";
import SkillsSection from "./_components/SkillsSection";

export default function NirvanPage() {
  return (
    <main className="bg-[#030a18]">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <section className="relative overflow-hidden bg-[#030a18] py-28 md:py-36">
        <div className="absolute top-0 left-0 h-px w-full bg-white/8" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-[25%] h-full w-px bg-white/5" />
          <div className="absolute top-0 left-[75%] h-full w-px bg-white/5" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <span className="text-primary-400 mb-10 block font-mono text-xs font-bold tracking-[0.3em] uppercase">
            // 04 — interests
          </span>
          <HobbiesSection />
        </div>
      </section>
      <section className="relative overflow-hidden bg-[#030a18] py-28 md:py-36">
        <div className="absolute top-0 left-0 h-px w-full bg-white/8" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-[25%] h-full w-px bg-white/5" />
          <div className="absolute top-0 left-[75%] h-full w-px bg-white/5" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <span className="text-primary-400 mb-10 block font-mono text-xs font-bold tracking-[0.3em] uppercase">
            // 05 — hyrule cooking pot
          </span>
          <div
            className="overflow-hidden rounded-lg"
            style={{
              backgroundImage: "url('/nirvan/botw-background.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <CookingPot />
          </div>
        </div>
      </section>
    </main>
  );
}
