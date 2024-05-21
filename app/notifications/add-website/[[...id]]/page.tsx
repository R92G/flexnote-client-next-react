import React from "react";
import { auth } from "@/auth";
import AddWebsiteComponent from "./AddWebsiteComponent";

const Page = async ({ params }: any) => {
  const session = await auth();
  const currentUser = session?.user;
  return <AddWebsiteComponent currentUser={currentUser} params={params} />;
};

export default Page;
