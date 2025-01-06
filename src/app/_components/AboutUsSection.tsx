import { LuBookOpenText, LuBuilding2, LuRocket, LuUsers } from "react-icons/lu";
export default function AboutUsSection() {
  return (
    <div className="mx-auto mb-16 w-full max-w-[1200]">
      <h2 className="mb-8 text-center text-5xl">About Us</h2>
      <div className="grid w-full justify-items-center gap-y-12 text-primary-800 sm:grid-cols-2">
        <div className="flex w-full max-w-96 flex-col items-center gap-12 text-center">
          <LuUsers size={100} strokeWidth={0.5}></LuUsers>
          <p>
            As UNSW&apos;s largest mechatronics-related society, we maintain a
            thriving community of over 1000 members.
          </p>
        </div>
        <div className="flex w-full max-w-96 flex-col items-center gap-12 text-center">
          <LuBookOpenText size={100} strokeWidth={0.5}></LuBookOpenText>
          <p>
            We provide hands-on workshops and practical projects, enabling
            students to bridge the gap between theoretical knowledge and
            real-world applications.
          </p>
        </div>
        <div className="flex w-full max-w-96 flex-col items-center gap-12 text-center">
          <LuBuilding2 size={100} strokeWidth={0.5}></LuBuilding2>
          <p>
            Our industry nights create valuable connections between students and
            leading companies, opening pathways to future career opportunities.
          </p>
        </div>
        <div className="flex w-full max-w-96 flex-col items-center gap-12 text-center">
          <LuRocket size={100} strokeWidth={0.5}></LuRocket>
          <p>
            Through competitions and social events, we cultivate a community
            where students can develop both technically and professionally.
          </p>
        </div>
      </div>
    </div>
  );
}
