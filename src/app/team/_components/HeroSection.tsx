import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative mb-16 flex h-[800px] w-full items-center justify-center">
      <div className="absolute left-0 top-0 -z-10 size-full">
        <Image
          className="size-full object-cover"
          src="/home/hero.jpg"
          width={1920}
          height={700}
          priority
          alt="Collage of events held by RAMSoc"
        ></Image>
        <div className="absolute left-0 top-0 size-full bg-primary-950/75"></div>
      </div>

      <h1 className="block text-6xl text-primary-50 md:contents xl:text-8xl">
        Our Team
      </h1>
    </div>
  );
}
