"use client";
import React, { useState, useTransition, useEffect } from "react";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import { Button } from "@/app/components/ui/button";
import ImageUpload from "@/app/components/ImageUpload";
import { NotificationSchema } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/components/ui/input";
import { FormError } from "@/app/components/auth/form-error";
import { FormSuccess } from "@/app/components/auth/form-success";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/app/components/ui/tooltip";
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
import Notification from "@/app/components/notification";
import { MessageCircleWarning } from "lucide-react";
import { Website } from "@prisma/client";
import { useRouter } from "next/navigation";
import { getNotificationById } from "@/actions/notifications/getNotificationById";
import { getWebsitesByUserId } from "@/actions/websites/getWebsitesByUserId";
import {
  createNotification,
  updateNotification,
} from "@/actions/notifications/notificationActions";
import { Switch } from "@/app/components/ui/switch";

const Page = ({ params }: any) => {
  const { id } = params;

  const router = useRouter();
  const currentUser = useCurrentUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [notificationId, setNotificationId] = useState<string | undefined>(
    id[0] as string
  );

  // get notification by id
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const fetchNotification = async () => {
      if (!notificationId) return;
      const result = await getNotificationById(notificationId);
      if (result) {
        const notificationData = result; // Modify according to actual data structure

        form.reset({
          id: notificationData.id,
          name: notificationData.name,
          isActive: notificationData.isActive,
          userId: notificationData.userId,
          imgUrl: notificationData.imgUrl as string,
          message: notificationData.message,
          link: notificationData.link,
          sender: notificationData.sender,
          page: notificationData.page,
          websiteId: notificationData.websiteId,
          showTimeInMs: notificationData.showTimeInMs,
          delayInMs: notificationData.delayInMs,
        });
      }
    };

    fetchNotification();
  }, []);

  const selectOnChange = (value: string) => {
    const website = websites.find((website) => website.id === value);
    setCustomValue("websiteId", website?.id as string);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const fetchWebsites = async () => {
      const websites = await getWebsitesByUserId(currentUser.id as string);

      if (websites.length === 0) {
        router.push("/notifications/add-website");
      }
      setWebsites(websites);
    };
    fetchWebsites();
  }, []);

  const form = useForm<z.infer<typeof NotificationSchema>>({
    resolver: zodResolver(NotificationSchema),
    defaultValues: {
      id: "",
      name: "",
      isActive: true,
      userId: currentUser?.id,
      imgUrl: "",
      message: "",
      link: "",
      sender: "",
      page: "",
      websiteId: "",
      showTimeInMs: 3000,
      delayInMs: 3000,
    },
  });

  const imgUrl = form.watch("imgUrl");

  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const previewNotification = () => {
    setIsNotificationVisible(true);
  };

  const createNotificationLocal = () => {
    if (success !== "") {
      form.reset();
      setNotificationId("");
      setSuccess("");
      setError("");
      return;
    }
    startTransition(() => {
      setError("");
      setSuccess("");
      form.handleSubmit(async (data) => {
        try {
          if (data.id !== "") {
            // De ID is aanwezig, voer een update uit
            await updateNotification(data);

            setSuccess("Notification updated successfully");
          } else {
            // Geen ID, maak een nieuwe website
            await createNotification(data);
            setSuccess("Notification created successfully");
          }
        } catch (error) {
          console.error("Failed to create or update notification:", error);
          setError("Failed to create or update notification");
        }
      })();
    });
  };

  return (
    <div className="flex flex-col sm:gap-4 sm:pl-14 overflow-hidden">
      <main className="grid flex-1 items-start gap-4 px-4 sm:px-6 py-20 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <Card
          className="col-span-1 sm:col-span-2 w-full"
          x-chunk="dashboard-05-chunk-0"
        >
          <CardHeader className="pb-12">
            <CardTitle>New Notification</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Create a new notification, so you can keep your users informed.
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
                          <FormLabel>Notification Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Subcribe reminder"
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
                      name="websiteId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Select {...field} onValueChange={selectOnChange}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Website" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Your websites</SelectLabel>
                                  {websites.map((website) => (
                                    <SelectItem
                                      key={website.id}
                                      value={website.id}
                                    >
                                      {website.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Click here to subcribe 👆"
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
                      name="page"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Page</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              type="text"
                              placeholder="e.g. /home, /about, /contact"
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
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link to (optional)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              type="text"
                              placeholder="https://example.com/subcribe"
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
                      name="sender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              type="text"
                              placeholder="Josh from Notify"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div>
                      <FormField
                        control={form.control}
                        name="delayInMs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-4">
                              <span>Delay (in ms)</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <MessageCircleWarning className="h-5 w-5" />
                                  </TooltipTrigger>
                                  <TooltipContent side="right">
                                    1000ms = 1 second
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                type="number"
                                placeholder="2000ms (2 seconds)"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="showTimeInMs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Showtime (in ms)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              type="number"
                              placeholder="3000ms (3 seconds)"
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
                      name="imgUrl"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Image (optional)</FormLabel>
                          <FormControl>
                            <div className=" flex gap-8 items-center">
                              <ImageUpload
                                onChange={(value) => {
                                  setCustomValue("imgUrl", value);
                                }}
                                value={imgUrl as string}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Is active</FormLabel>
                          <FormControl>
                            <div className=" flex gap-8 items-center">
                              <div className="flex items-center">
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={form.watch("isActive")}
                                    onCheckedChange={(value) =>
                                      setCustomValue("isActive", value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
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
          <CardFooter className="flex gap-8">
            <Button
              disabled={
                form.watch("sender") === "" || form.watch("message") === ""
              }
              variant={"outline"}
              onClick={previewNotification}
            >
              Preview
            </Button>
            <Button onClick={createNotificationLocal}>
              {notificationId !== ""
                ? "Update"
                : success === ""
                ? "Create"
                : "Create new"}
            </Button>
          </CardFooter>
        </Card>
        <Notification
          isNotificationVisible={isNotificationVisible}
          setIsNotificationVisible={setIsNotificationVisible}
          imgUrl={imgUrl}
          sender={form.watch("sender")}
          message={form.watch("message")}
          link={form.watch("link")}
          showTimeInMs={form.watch("showTimeInMs")}
          delayInMs={form.watch("delayInMs")}
        />
      </main>
    </div>
  );
};

export default Page;
