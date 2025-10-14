import { Container } from "@/components/ui/Container";

import HeroSection from "./_components/HeroSection";

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mb-16 min-h-screen">
      <HeroSection />
      <Container className="px-4">{children}</Container>
    </main>
  );
}
