import React from "react";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";
import { useCurrentUser } from "../hooks/use-current-user";
import useRegisterModal from "../hooks/useRegisterModal";
import { useRouter } from "next/navigation";

const CTAbutton = () => {
  const user = useCurrentUser();
  const registerModal = useRegisterModal();
  const router = useRouter();

  const handleOnClick = () => {
    if (!user) {
      registerModal.onOpen();
    } else {
      router.push("/notifications/create");
    }
  };

  return (
    <Button
      className="flex gap-4 mx-auto mt-8"
      variant={"default"}
      onClick={handleOnClick}
    >
      <CirclePlus />
      Create your first notification
    </Button>
  );
};

export default CTAbutton;
