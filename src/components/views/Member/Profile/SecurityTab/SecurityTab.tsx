import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useSecurityTab from "./useSecurityTab";

const SecurityTab = () => {
  const {
    controlUpdatePassword,
    handleSubmitUpdatePassword,
    errorsUpdatePassword,
    handleUpdatePassword,
    isPendingMutateUpdatePassword,
  } = useSecurityTab();

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center" onSubmit={() => {}}>
        <h1 className="w-full text-xl font-bold">Security</h1>
        <p className="text-small text-default-400 w-full">
          Update your account security
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}
        >
          <Controller
            name="oldPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Old Password"
                variant="bordered"
                placeholder="Input your old password"
                labelPlacement="outside"
                isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                errorMessage={errorsUpdatePassword.oldPassword?.message}
                type="password"
              />
            )}
          />
          <Controller
            name="password"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="New Password"
                variant="bordered"
                placeholder="Input your new password"
                labelPlacement="outside"
                isInvalid={errorsUpdatePassword.password !== undefined}
                errorMessage={errorsUpdatePassword.password?.message}
                type="password"
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Confirm New Password"
                variant="bordered"
                placeholder="Input your new password"
                labelPlacement="outside"
                isInvalid={errorsUpdatePassword.confirmPassword !== undefined}
                errorMessage={errorsUpdatePassword.confirmPassword?.message}
                type="password"
              />
            )}
          />
          <Button
            color="danger"
            className="disabled:bg-default-500 mt-2"
            type="submit"
            disabled={isPendingMutateUpdatePassword}
          >
            {isPendingMutateUpdatePassword ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default SecurityTab;
