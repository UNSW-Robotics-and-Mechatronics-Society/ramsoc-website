import Image from "next/image";

export function NoEvents() {
  return (
    <div className="flex w-full flex-col items-center gap-16">
      <Image
        src="/home/sleeping-logo.svg"
        alt="sleeping ramsoc logo"
        width={500}
        height={387}
        className="translate-x-[2.5%]"
      />
      <p>There are no events currently. Check back later!</p>
    </div>
  );
}
