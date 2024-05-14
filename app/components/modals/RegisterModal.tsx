"use client";

import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { register } from "@/actions/register";
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-sucess";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Social } from "../social";

export function RegisterModal() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      company: "",
      name: "",
    },
  });

  const toggleBetweenLoginAndRegister = () => {
    loginModal.onOpen();
    registerModal.onClose();
  };

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const bodyContent = (
    <>
      <CardHeader>
        <CardTitle className="text-xl">Welcome</CardTitle>
        <CardDescription>Enter your information to register</CardDescription>
      </CardHeader>
      <CardContent>
        <Social />
        <hr className="my-4" />
        <Form {...form}>
          <form>
            <div className="grid  gap-4 pb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Max Cooper"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 pb-8">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Your company"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="h@company.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </form>
        </Form>
      </CardContent>
    </>
  );

  const footer = (
    <>
      <div className="mt-4 text-center text-sm pb-8">
        Already have an account?{" "}
        <p
          onClick={toggleBetweenLoginAndRegister}
          className="underline block sm:inline cursor-pointer"
        >
          Log in here
        </p>
      </div>
    </>
  );

  return (
    <Modal
      disabled={isPending}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Register"
      onClose={() => {
        registerModal.onClose();
        setError("");
        setSuccess("");
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footer}
    />
  );
}

export default RegisterModal;
