import { Container } from "@/components/ui/container";

import { Hero } from "@/components/hero";

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mb-16 min-h-screen">
      <Hero
        imageSrc="/careers/hero.webp"
        imageAlt="Collage of careers at RAMSoc"
      >
        Careers
      </Hero>
      <Container className="px-4">{children}</Container>
    </main>
  );
}
