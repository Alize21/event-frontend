import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useInfoTab from "./useInfoTab";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  dataProfile: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = ({
  dataProfile,
  onUpdate,
  isPendingUpdate,
  isSuccessUpdate,
}: PropTypes) => {
  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataProfile) {
      setValueUpdateInfo("fullName", `${dataProfile?.fullName}`);
    }
  }, [dataProfile, setValueUpdateInfo]);

  useEffect(() => {
    if (isSuccessUpdate) resetUpdateInfo();
  }, [isSuccessUpdate, resetUpdateInfo]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center" onSubmit={() => {}}>
        <h1 className="w-full text-xl font-bold">User Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage your information
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataProfile?.username} className="rounded-lg">
            <Input
              label="Username"
              labelPlacement="outside"
              disabled
              variant="flat"
              value={dataProfile?.username}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.email} className="rounded-lg">
            <Input
              label="Email"
              labelPlacement="outside"
              disabled
              variant="flat"
              value={dataProfile?.email}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.role} className="rounded-lg">
            <Input
              label="Role"
              labelPlacement="outside"
              disabled
              variant="flat"
              value={dataProfile?.role}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile?.fullName} className="rounded-lg">
            <Controller
              name="fullName"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Fullname"
                  variant="bordered"
                  placeholder="Input your new fullname"
                  labelPlacement="outside"
                  isInvalid={errorsUpdateInfo.fullName !== undefined}
                  errorMessage={errorsUpdateInfo.fullName?.message}
                />
              )}
            />
          </Skeleton>
          <Button
            color="danger"
            className="disabled:bg-default-500 mt-2"
            type="submit"
            disabled={isPendingUpdate || !dataProfile?._id}
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

export default InfoTab;
