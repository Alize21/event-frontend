import { cn } from "@/utils/cn";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

type PropTypes = {
  name: string;
  className?: string;
  isDropable?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isInvalid?: boolean;
  errorMessage?: string;
};

const InputFile = ({
  name,
  className,
  isDropable = false,
  onChange,
  isInvalid,
  errorMessage,
}: PropTypes) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDropOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setUploadedFile(e.dataTransfer?.files[0] || null);
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDropOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDropOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
      if (onChange) {
        onChange(e);
      }
    }
  };

  return (
    <div>
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "border-default-300 bg-default-50 hover:bg-default-100 focus:ring-default-500 flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-center focus:ring-2 focus:ring-offset-2 focus:outline-none",
          className,
          { "border-danger-500": isInvalid },
        )}
      >
        {uploadedFile ? (
          <div className="flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2">
              <Image
                fill
                src={URL.createObjectURL(uploadedFile)}
                alt="image"
                className="!relative"
              />
            </div>
            <p className="text-cente text-sm font-semibold text-gray-500">
              {uploadedFile.name}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-5">
            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-cente text-sm font-semibold text-gray-500">
              {isDropable
                ? "Drag and drop your file here, or click to select file"
                : "Click to select file"}
            </p>
          </div>
        )}
        <input
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          onChange={handleOnChange}
        />
      </label>
      {isInvalid && (
        <p className="text-danger-500 p-1 text-xs">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
