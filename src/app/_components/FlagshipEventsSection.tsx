import ParallaxText from "@/components/ui/ParallaxText";

interface ScrollBannerProps {
  velocity: number;
  text: string;
}

const ScrollBanner = ({ velocity, text }: ScrollBannerProps) => {
  return (
    <div className="w-full border-y-4 border-primary-950 bg-primary-800 text-3xl font-bold italic tracking-tight text-primary-100">
      <ParallaxText baseVelocity={velocity}>{text.toUpperCase()}</ParallaxText>
    </div>
  );
};

interface EventCardProps {
  name: string;
}

const EventCard = ({ name }: EventCardProps) => {
  return (
    <div className="flex h-full w-full justify-center bg-primary-500">
      <h1 className="self-center italic text-primary-50">
        {name.toUpperCase()}
      </h1>
    </div>
  );
};

const FlagshipEventsSection = () => {
  return (
    <>
      <ScrollBanner velocity={3} text={"Flagship Events"} />
      <div className="flex h-[50vh] w-full flex-auto">
        <EventCard name={"Sumobots"} />
        <EventCard name={"Buildathon"} />
      </div>
      <ScrollBanner velocity={-3} text={"Flagship Events"} />
    </>
  );
};

export default FlagshipEventsSection;
