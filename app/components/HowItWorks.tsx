"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";
import CTAbutton from "./CTAbutton";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "1. Set Up Notifications",
    description:
      "Users can quickly set up their notification preferences and customize message content tailored to their audience's needs.",
  },
  {
    icon: <MapIcon />,
    title: "2. Broadcast Messages",
    description:
      "With the click of a button, users broadcast these customized notifications to their audience, helping to enhance engagement and drive sales.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-12 sm:py-24">
      <h2 className="text-3xl md:text-4xl font-bold ">How It Works</h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Get started quickly with Flexnote and see results almost immediately.
      </p>

      <div className="flex flex-col md:flex-row justify-around w-full gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50 max-w-[500px]">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
      <CTAbutton />
    </section>
  );
};
