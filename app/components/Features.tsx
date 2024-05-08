import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import image from "@/public/images/cube-leg.png";
import image3 from "@/public/images/looking-ahead.png";
import image4 from "@/public/images/reflecting.png";
import Image, { StaticImageData } from "next/image";

interface FeatureProps {
  title: string;
  description: string;
  image: StaticImageData;
}

const features: FeatureProps[] = [
  {
    title: "Boost user engagement",
    description:
      "Show messages at the right time to the right users, increasing engagement and conversion rates.",
    image: image4,
  },
  {
    title: "Intuitive user interface",
    description:
      "Your marketeers will love the simplicity and ease of use of Flexnote's interface. It's designed to be user-friendly and intuitive.",
    image: image3,
  },
  {
    title: "AI-Powered Notifications (Coming Soon)",
    description:
      "Smart notifications that adapt to your users' preferences and behavior.",
    image: image,
  },
];

const featureList: string[] = [
  "New Reviews",
  "New Features",
  "Promotional offers",
  "Legal updates",
  "Flash deals",
  "Welcome messages",
  "User onboarding",
  "Product updates",
  "Order confirmations",
  "Feedback requests",
  "Customer support",
  "Account notifications",
  "Event reminders",
  "Social media updates",
  "Product recommendations",
  "Cart abandonment",
  "Pricing",
  "Contact initiations",
  "Stock info",
  "E-mail subscriptions",
  "Newsletter",
];

export const Features = () => {
  return (
    <section id="features" className="container py-12 sm:py-24 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Use Cases
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground text-center">
        When should you use Flexnote? Here are some of the most common use cases
      </p>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <div className="w-[200px] lg:w-[300px] relative">
                <Image
                  src={image}
                  fill
                  alt="About feature"
                  className="mx-auto"
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
