import { RoleGate } from "@/app/components/auth/role-gate";
import UsersComponent from "./UsersComponent";

import React from "react";

const Page = () => {
  return (
    <RoleGate allowedRole="ADMIN">
      <UsersComponent />
    </RoleGate>
  );
};

export default Page;
