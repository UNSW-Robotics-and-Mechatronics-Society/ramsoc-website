import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative mb-16 flex h-[800] w-full items-center justify-center">
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <Image
          className="h-full w-full object-cover"
          src="/home/hero.jpg"
          width={1920}
          height={700}
          priority
          alt="Collage of events held by RAMSoc"
        ></Image>
        <div className="bg-primary-950 absolute left-0 top-0 h-full w-full bg-opacity-75"></div>
      </div>

      <h1 className="text-primary-50 block text-6xl font-bold md:contents xl:text-8xl">
        Our Team
      </h1>
    </div>
  );
}
