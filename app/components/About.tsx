import { Statistics } from "./Statistics";
import pilot from "@/public/images/pilot.png";
import Image from "next/image";

export const About = () => {
  return (
    <section id="about" className="container py-12 sm:py-24">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <div className="w-[300px] relative">
            <Image
              src={pilot}
              alt="afbeelding"
              fill
              sizes="300px"
              className="object-contain rounded-lg"
            />
          </div>
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Flexnote
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Easy-to-use notification manager that can help them increase
                customer experience, boost sales, and enhance engagement.
                Flexnote was developed in response to the demand for a flexible,
                straightforward solution to connect with customers effectively,
                tailored specifically for non-developers with an online
                business.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
