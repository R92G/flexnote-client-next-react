"use client";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Check } from "lucide-react";
import useRegisterModal from "../hooks/useRegisterModal";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Free",
    popular: 0,
    price: 0,
    description:
      "An ideal choice for individuals just starting out. Get essential features without any cost.",
    buttonText: "Get Started",
    benefitList: [
      "1 Team member",
      "1 Website",
      "Up to 6 notifications",
      "Support",
    ],
  },
  {
    title: "Premium",
    popular: 1,
    price: 5,
    description:
      "Perfect for growing teams looking to boost their outreach with more features and flexibility.",
    buttonText: "Start Free Trial",
    benefitList: [
      "3 Team members",
      "3 Websites",
      "Up to 18 Notifications",
      "Priority support",
    ],
  },
  {
    title: "Enterprise",
    popular: 0,
    price: 40,
    description:
      "A comprehensive suite for large organizations needing advanced capabilities and dedicated support.",
    buttonText: "Contact Us",
    benefitList: [
      "Unlimited team members",
      "Unlimited websites",
      "Unlimited notifications",
      "Personalized support",
    ],
  },
];

export const Pricing = () => {
  const registerModal = useRegisterModal();
  return (
    <section id="pricing" className="container py-12 sm:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Get
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Unlimited{" "}
        </span>
        Access
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Get started with Flexnote Notifications today
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge variant="secondary" className="text-sm text-primary">
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">${pricing.price}</span>
                <span className="text-muted-foreground"> /month</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button onClick={registerModal.onOpen} className="w-full">
                {pricing.buttonText}
              </Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.length > 1
                  ? pricing.benefitList.map((benefit: string) => (
                      <span key={benefit} className="flex">
                        <Check className="text-green-500" />{" "}
                        <h3 className="ml-2">{benefit}</h3>
                      </span>
                    ))
                  : null}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
