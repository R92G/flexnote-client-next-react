import { ArrowRightFromLine } from "lucide-react";

interface SponsorProps {
  icon: JSX.Element;
  name: string;
}

const sponsors: SponsorProps[] = [
  {
    icon: <ArrowRightFromLine size={34} />,
    name: "User-Friendly Design",
  },
  {
    icon: <ArrowRightFromLine size={34} />,
    name: "Effective communication",
  },
  {
    icon: <ArrowRightFromLine size={34} />,
    name: "Increase Sales",
  },
  {
    icon: <ArrowRightFromLine size={34} />,
    name: "Lightweight and Efficient",
  },
  {
    icon: <ArrowRightFromLine size={34} />,
    name: "Smart Notifications",
  },
  {
    icon: <ArrowRightFromLine size={34} />,
    name: "Improve Customer Experience",
  },
];

export const Sponsors = () => {
  return (
    <section id="sponsors" className="container pt-24 sm:py-24">
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Why people are using Flexnote?
      </h2>

      <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center items-start w-[400px] lg:w-fit mx-auto lg:mx-0 lg:items-center gap-4 md:gap-8">
        {sponsors.map(({ icon, name }: SponsorProps) => (
          <div
            key={name}
            className="flex items-center gap-1 text-muted-foreground/60"
          >
            <span>{icon}</span>
            <h3 className="text-xl  font-bold">{name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
