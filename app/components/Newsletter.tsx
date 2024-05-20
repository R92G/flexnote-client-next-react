"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { resendContactCreate } from "@/app/actions/createResendContactAction";
import { FormSuccess } from "./form-sucess";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    resendContactCreate(email);
    setSuccess(true);
  };

  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-12 sm:py-24">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Request a demo?
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          Sign up here and our team will get in touch with you shortly.
        </p>

        <form
          className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <Input
              placeholder="youremail@gmail.com"
              className="bg-muted/50 dark:bg-muted/80 "
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              aria-label="email"
            />
            <div className="mt-2">
              <FormSuccess message={success ? "Demo Requested!" : ""} />
            </div>
          </div>
          <Button type="submit" disabled={success} className="cursor-pointer">
            Request now
          </Button>
        </form>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
