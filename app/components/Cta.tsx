"use client";
import CTAbutton from "./CTAbutton";
import { ExtendedUser } from "@/next-auth";

interface CtaProps {
  currentUser?: ExtendedUser;
}

export const Cta = ({ currentUser }: CtaProps) => {
  return (
    <section id="cta" className="bg-muted/50 py-16 my-24 sm:my-32">
      <div className="container lg:grid lg:grid-cols-2 place-items-center relative">
        <div className="shadow"></div>
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            All your web notifications in one place
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            We understand that as a business owner, you don&apos;t want to be
            dependent on multiple platforms or Developers to manage your
            notifications. Flexnote Notifications is a one-stop solution for all
            your web notification needs.
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2 ">
          <CTAbutton currentUser={currentUser} />
        </div>
        {/* Shadow effect */}
      </div>
    </section>
  );
};
