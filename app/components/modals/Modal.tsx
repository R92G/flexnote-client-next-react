"use client";
import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    // Disable scrolling on the <main> element when the modal is open
    const mainElement = document.querySelector("main");
    if (!mainElement) {
      return;
    }
    if (showModal) {
      mainElement.style.overflow = "hidden";
    } else {
      mainElement.style.overflow = "";
    }

    // Cleanup function to ensure overflow is reset when the component unmounts
    return () => {
      mainElement.style.overflow = "";
    };
  }, [showModal]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    console.log("submitting");
    if (disabled) {
      console.log("disabled");
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction, secondaryActionLabel]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
            justify-center
            items-center
            flex
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            z-50
            outline-none
            focus:outline-none
            bg-neutral-800/70
            md:pb-[50px]
            "
      >
        <div
          className="'
          relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full 
        "
        >
          {/* CONTENT */}
          <div
            className={`translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"} `}
          >
            <Card className="translate min-h-screen sm:min-h-auto h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none md:mt-[50px] md:mb-[50px]">
              {/* HEADER */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              <div className="relative p-6">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 px-12">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryActionLabel && handleSecondaryAction && (
                    <Button disabled={disabled} onClick={handleSecondaryAction}>
                      {secondaryActionLabel}
                    </Button>
                  )}

                  <Button
                    className="w-full"
                    disabled={disabled}
                    onClick={handleSubmit}
                  >
                    {actionLabel}
                  </Button>
                </div>
                {footer}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
