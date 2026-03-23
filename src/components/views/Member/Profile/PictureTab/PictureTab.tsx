import InputFile from "@/components/ui/InputFile";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import usePictureTab from "./usePictureTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const PictureTab = ({
  currentPicture,
  onUpdate,
  isPendingUpdate,
  isSuccessUpdate,
}: PropTypes) => {
  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorsUpdatePicture,
    resetUpdatePicture,
    preview,
  } = usePictureTab();

  useEffect(() => {
    if (isSuccessUpdate) resetUpdatePicture();
  }, [isSuccessUpdate, resetUpdatePicture]);

  return (
    <Card className="w-full p-4 lg:w-1/3">
      <CardHeader className="flex-col items-center" onSubmit={() => {}}>
        <h1 className="w-full text-xl font-bold">Profile Picture</h1>
        <p className="text-small text-default-400 w-full">
          Manage picture for your profile
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-default-700 text-sm font-medium">
              Current Picture
            </p>
            <Skeleton
              isLoaded={!!currentPicture}
              className="aspect-square w-full rounded-lg"
            >
              <Avatar
                src={currentPicture}
                alt="Picture"
                showFallback
                className="aspect-square h-full w-full"
              />
            </Skeleton>
          </div>
          <Controller
            name="profilePicture"
            control={controlUpdatePicture}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeletePicture(onChange)}
                onUpload={(files) => handleUploadPicture(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                errorMessage={errorsUpdatePicture.profilePicture?.message}
                isDropable
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload New Picture
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            color="danger"
            className="disabled:bg-default-500 mt-2"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default PictureTab;
