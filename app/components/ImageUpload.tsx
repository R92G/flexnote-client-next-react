"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { MouseEvent, MouseEventHandler, useCallback } from "react";
import { Image as ImgIcon } from "lucide-react";
import { TbPhotoPlus } from "react-icons/tb";
import { Button } from "./ui/button";
import { FormError } from "./form-error";

declare global {
  var cloudinary: any;
}

const uploadPreset = "qmp1hfqq";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const setResource = useCallback(
    (info: any) => {
      if (info) {
        onChange(info.secure_url);
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      options={{
        maxFiles: 1,
      }}
      uploadPreset={uploadPreset}
      onSuccess={(result, { widget }) => {
        if (result && result.info) {
          setResource(result.info);
        }
      }}
    >
      {({ open }) => {
        function handleOnClick(e: MouseEvent) {
          e.preventDefault();

          // Ensure 'setResource' is not called with undefined
          // if you want to reset something here, ensure it's handled safely
          if (open) {
            open();
          }
        }
        return (
          <div className="flex gap-8 items-center">
            <Button
              size={"sm"}
              className="text-left w-[200px] p-6 flex items-center border-dashed border-2 rounded-xl "
              variant={"secondary"}
              onClick={handleOnClick}
            >
              <ImgIcon size={15} className="mr-2" />{" "}
              {value ? "Edit" : "Upload an Image"}
            </Button>
            {value && (
              <Image
                width={50}
                height={50}
                src={value as string}
                alt="Notification Image"
                className="rounded-[5px] object-cover !w-[50px] !h-[50px] object-top"
              />
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
