"use client";
import { useState, useEffect } from "react";
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
import { getAllUsers, deleteUser } from "@/app/actions/admin/userActions";
import { User } from "@prisma/client";

export default function UsersComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      const users = await getAllUsers();
      setUsers(users);
      setLoadingUsers(false);
    };

    fetchUsers();
  }, []);

  const deleteUserLocal = () => {
    deleteUser(selectedUserId as string);
    setUsers(users.filter((n) => n.id !== selectedUserId));
    setDialogOpen(false);
  };

  return loadingUsers ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-col sm:gap-4 py-16 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-16 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            {/* Users */}
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Flexnote users and their roles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>userId</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        email
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Plan
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  {users.length === 0 ? (
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={1}
                          className="text-left mt-4 text-lighter"
                        >
                          No users found...
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {users.map((user) => (
                        <TableRow
                          className="hover:cursor-pointer"
                          key={user.id}
                        >
                          <TableCell>
                            <div className="font-medium">{user.id}</div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {user.email}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {user.plan}
                          </TableCell>

                          <TableCell className="text-right">
                            <Button
                              variant={"link"}
                              className="hover:text-red-500 transition-colors duration-300 ease-in-out"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setSelectedUserId(user.id);
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
          </div>
        </main>
        <AlertDialog open={dialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this user?
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
                  deleteUserLocal();
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
