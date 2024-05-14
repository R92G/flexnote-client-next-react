"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { login } from "@/actions/login";
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-sucess";
import { Social } from "../social";
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
import { useRouter } from "next/navigation";

export function LoginModal() {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleBetweenLoginAndRegister = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    try {
      startTransition(async () => {
        const data = await login(values);
        console.log(data);
        if (data) {
          if (data.error) {
            form.reset();
            setError(data.error);
          } else if (data.success) {
            form.reset();
            loginModal.onClose();
            setSuccess(data.success);
            router.refresh();
          } else if (data.twoFactor) {
            setShowTwoFactor(true);
          }
        } else {
          setError("Something went wrong");
        }
      });
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const bodyContent = (
    <>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Enter your information to log in</CardDescription>
      </CardHeader>
      <CardContent>
        <Social />
        <hr className="my-4" />
        <Form {...form}>
          <form>
            <div className="grid gap-4">
              {showTwoFactor && (
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Two Factor Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="123456"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {!showTwoFactor && (
                <>
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
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <p
                      onClick={() => {
                        loginModal.onClose;
                        router.push("/auth/reset");
                      }}
                    >
                      Forgot password?
                    </p>
                  </Button>
                </>
              )}
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
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account yet?{" "}
        <p
          onClick={toggleBetweenLoginAndRegister}
          className="underline block sm:inline cursor-pointer"
        >
          Register here
        </p>
      </div>
    </>
  );

  return (
    <Modal
      disabled={isPending}
      isOpen={loginModal.isOpen}
      title="Log in"
      actionLabel={showTwoFactor ? "Confirm" : "Log in"}
      onClose={() => {
        setError("");
        setSuccess("");
        loginModal.onClose();
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footer}
    />
  );
}

export default LoginModal;
