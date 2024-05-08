"use client";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import USP from "./USP";
import CTAbutton from "./CTAbutton";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-24 md:pt-40 pb-20 gap-10 overflow-hidden">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline z-20">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Flexnote
            </span>{" "}
            Notifications
          </h1>{" "}
        </main>
        <USP />
        <p className="text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          A flexible lightweight notification manager
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <CTAbutton />
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10 w-full">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
