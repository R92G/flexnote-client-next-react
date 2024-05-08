"use client";
import React, { useState, useTransition, useEffect } from "react";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import { Button } from "@/app/components/ui/button";
import ImageUpload from "@/app/components/ImageUpload";
import { WebsiteSchema } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/components/ui/input";
import { FormError } from "@/app/components/auth/form-error";
import { FormSuccess } from "@/app/components/auth/form-success";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/app/components/ui/form";
import { X } from "lucide-react";
import { Website } from "@prisma/client";
import { usePathname } from "next/navigation";
import { getNotificationById } from "@/actions/notifications/getNotificationById";
import { getWebsitesByUserId } from "@/actions/websites/getWebsitesByUserId";
import {
  createWebsite,
  updateWebsite,
} from "@/actions/websites/websiteActions";
import { getWebsiteByWebsiteId } from "@/actions/websites/getWebsiteByWebsiteId";
import { useRouter } from "next/navigation";
import useGlobalWebsiteCount from "@/hooks/useGlobalWebsiteCount";
import CodeBlock from "@/app/components/codeblock";
import { emailScriptTag } from "@/actions/emailScriptTag";

const schema = z.object({
  email: z.string().email(),
});

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useCurrentUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [newWebsiteId, setNewWebsiteId] = useState<string | undefined>("");
  const [scriptTagDialogOpen, setScriptTagDialogOpen] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { onAdd } = useGlobalWebsiteCount();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState<string | undefined>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const sendEmailWithScript = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      const validatedData = schema.parse({ email });
      await emailScriptTag(validatedData.email, newWebsiteId as string);
      setErrorEmail("");
      setEmailSent(true);
    } catch (err: any) {
      console.error("Ongeldig e-mailadres:", err.message);
      setErrorEmail("Invalid email address");
    }
  };

  // get last segment
  const websiteId = pathname.split("/").pop();

  // get website by id
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const fetchWebsite = async () => {
      if (!websiteId) return;
      const websiteData = await getWebsiteByWebsiteId(websiteId as string);

      form.reset({
        id: websiteData?.id as string,
        url: websiteData?.url as string,
        name: websiteData?.name as string,
        userId: websiteData?.userId as string,
      });
    };
    fetchWebsite();
  }, []);

  const form = useForm<z.infer<typeof WebsiteSchema>>({
    resolver: zodResolver(WebsiteSchema),
    defaultValues: {
      id: "",
      name: "",
      url: "",
      userId: currentUser?.id,
    },
  });

  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const createOrUpdateWebsiteLocal = () => {
    startTransition(() => {
      setError("");
      setSuccess("");
      form.handleSubmit(async (data) => {
        try {
          if (data.id !== "") {
            // De ID is aanwezig, voer een update uit
            await updateWebsite(
              data.id as string,
              data.name,
              data.url,
              currentUser?.id as string
            );
            setSuccess("Website updated successfully");
          } else {
            // Geen ID, maak een nieuwe website
            const { id } = await createWebsite(
              data.name,
              data.url,
              currentUser?.id as string
            );
            setNewWebsiteId(id);
            setSuccess("Website created successfully");
            onAdd();
            setScriptTagDialogOpen(true);
          }
        } catch (error) {
          console.error("Failed to create or update website:", error);
          setError("Failed to create or update website");
        }
      })();
    });
  };

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 py-16 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-12">
            <CardTitle>New Website</CardTitle>

            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Create a new website to display notifications on.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form>
                <div className="grid gap-4 pb-8">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Pet Store 'Amalia'"
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
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="https://petstoreamalia.com"
                              type="text"
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
          <CardFooter className="flex gap-4">
            <Button
              disabled={success !== "" || error !== ""}
              onClick={createOrUpdateWebsiteLocal}
            >
              {websiteId === "" ? "Create Website" : "Update Website"}
            </Button>
            {success !== "" && (
              <Button
                variant={"secondary"}
                onClick={() => router.push("/notifications/create")}
              >
                Create a notification
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
      <AlertDialog open={scriptTagDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle>Script tag</AlertDialogTitle>
              <X
                onClick={() => setScriptTagDialogOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <AlertDialogDescription>
              Place the following script tag at the end of the body tag of your
              website. Dont have access to your website? Send this script tag to
              your Developer.
              <CodeBlock id={newWebsiteId as string} />
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex flex-col gap-2">
            <div className="flex flex-col flex-1">
              <Input
                disabled={emailSent}
                onChange={handleEmailChange}
                placeholder="your-developer@email.com"
                className="pb-2"
              />

              <div className="pt-2">
                <FormError message={errorEmail} />
                <FormSuccess message={emailSent ? "Email sent!" : ""} />
              </div>
            </div>
            <AlertDialogAction onClick={sendEmailWithScript}>
              Send to your developer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Page;
