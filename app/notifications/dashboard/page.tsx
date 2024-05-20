"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
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
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/app/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Notification, Website } from "@prisma/client";
import { useCurrentUser } from "@/app/hooks/use-current-user";
import axios from "axios";
import { getWebsitesByUserId } from "@/app/actions/websites/getWebsitesByUserId";
import Loader from "@/app/components/Loader";
import { deleteNotification } from "@/app/actions/notifications/notificationActions";
import { deleteWebsite } from "@/app/actions/websites/websiteActions";

export default function Dashboard() {
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(true); // Single loading state
  const [currentWebsite, setCurrentWebsite] = useState<Website | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [websiteDialogOpen, setWebsiteDialogOpen] = useState(false);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState("");
  const [selectedNotificationId, setSelectedNotificationId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchWebsites = async () => {
      setLoading(true);
      try {
        const websites = await getWebsitesByUserId(currentUser.id as string);
        if (websites.length === 0) {
          router.push("/notifications/add-website");
        } else {
          setWebsites(websites);
          setCurrentWebsite(websites[0]);
        }
      } catch (error) {
        console.error("Failed to fetch websites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, [currentUser, router]);

  useEffect(() => {
    if (!currentWebsite) {
      return;
    }

    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const result = await axios.post("/api/getNotificationsByWebsiteId", {
          websiteId: currentWebsite.id,
        });
        setNotifications(result.data.notifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentWebsite]);

  const selectOnChange = (value: string) => {
    const website = websites.find((website) => website.id === value);
    setCurrentWebsite(website || null);
  };

  const deleteNotificationLocal = async () => {
    try {
      await deleteNotification(selectedNotificationId);
      setNotifications(
        notifications.filter((n) => n.id !== selectedNotificationId)
      );
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const deleteWebsiteLocal = async () => {
    try {
      await deleteWebsite(selectedWebsiteId);
      setWebsites(
        websites.filter((website) => website.id !== selectedWebsiteId)
      );
      setWebsiteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete website:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!currentWebsite && websites.length === 0) {
    router.push("/notifications/add-website");
    return null; // Render nothing while redirecting
  }

  return (
    <>
      <div className="flex flex-col sm:gap-4 py-16 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-16 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Your Notifications</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Seamless notification management.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={() => router.push("/notifications/create")}>
                    Create New Notification
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="w-fit bg-card">
              <Select
                value={currentWebsite?.id || ""}
                onValueChange={selectOnChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Website" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Your websites</SelectLabel>
                    {websites.map((website) => (
                      <SelectItem key={website.id} value={website.id}>
                        {website.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Current notification customers will see on your website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Notification</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Page
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  {notifications.length === 0 ? (
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={1}
                          className="text-left mt-4 text-lighter"
                        >
                          No notifications found...
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {notifications.map((notification) => (
                        <TableRow
                          className="hover:cursor-pointer"
                          key={notification.id}
                          onClick={() =>
                            router.push(
                              `/notifications/create/${notification.id}`
                            )
                          }
                        >
                          <TableCell>
                            <div className="font-medium">
                              {notification.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {notification.message}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {notification.page}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge
                              className="text-xs"
                              variant={
                                notification.isActive ? "default" : "secondary"
                              }
                            >
                              {notification.isActive ? "Active" : "Non-active"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Intl.DateTimeFormat("en-US").format(
                              new Date(notification.createdAt)
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {notification.imgUrl ? (
                              <Image
                                src={notification.imgUrl}
                                alt={notification.name}
                                width={50}
                                height={50}
                                className="rounded-full w-[50px] h-[50px] object-cover hidden sm:block"
                              />
                            ) : null}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant={"link"}
                              className="hover:text-red-500 transition-colors duration-300 ease-in-out"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setSelectedNotificationId(notification.id);
                                setDialogOpen(true);
                              }}
                            >
                              <Trash size={20} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </CardContent>
            </Card>
            <Card className="dashboard-05-chunk-3">
              <CardHeader className="pb-3">
                <CardTitle>Your Websites</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Manage your websites here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Website Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        URL
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {websites.map((website) => (
                      <TableRow
                        onClick={() => {
                          router.push(
                            `/notifications/add-website/${website.id}`
                          );
                        }}
                        className="cursor-pointer"
                        key={website.id}
                      >
                        <TableCell>{website.name}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {website.url}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant={"link"}
                            className="hover:text-red-500 transition-colors duration-300 ease-in-out"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setSelectedWebsiteId(website.id);
                              setWebsiteDialogOpen(true);
                            }}
                          >
                            <Trash size={20} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
        <AlertDialog open={dialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this notification?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. All associated data will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteNotificationLocal();
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog open={websiteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this website?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. All associated data will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setWebsiteDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={deleteWebsiteLocal}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
