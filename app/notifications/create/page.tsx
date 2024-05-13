"use client";
import React, { useState, useTransition, useEffect } from "react";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import ImageUpload from "@/app/components/ImageUpload";
import { NotificationSchema } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/components/ui/input";
import { FormError } from "@/app/components/auth/form-error";
import { FormSuccess } from "@/app/components/auth/form-success";
import axios from "axios";
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

const page = () => {
  const currentUser = useCurrentUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);

  const selectOnChange = (value: string) => {
    const website = websites.find((website) => website.id === value);
    setCustomValue("websiteId", website);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const fetchWebsites = async () => {
      const result = await axios.post("/api/getWebsitesByUserId", {
        userId: currentUser.id,
      });
      setWebsites(result.data);
      setCustomValue("websiteId", result.data[0].id);
    };
    fetchWebsites();
  }, []);

  const form = useForm<z.infer<typeof NotificationSchema>>({
    resolver: zodResolver(NotificationSchema),
    defaultValues: {
      name: "",
      isActive: true,
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

  const createNotification = () => {
    console.log("create notification");
  };

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
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
                              placeholder="/home"
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
                          <FormLabel>Link</FormLabel>
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
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <div className="flex gap-8 items-center">
                              <ImageUpload
                                onChange={(value) => {
                                  console.log(value);
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
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button
              disabled={
                form.watch("sender") === "" || form.watch("message") === ""
              }
              variant={"outline"}
              onClick={previewNotification}
            >
              Preview Notification
            </Button>
            <Button onClick={createNotification}>Create Notification</Button>
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

export default page;
