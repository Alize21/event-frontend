import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Textarea,
} from "@heroui/react";

interface PropTypes {
  dataCategory: ICategory;
}

const InfoTab = ({ dataCategory }: PropTypes) => {
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center" onSubmit={() => {}}>
        <h1 className="w-full text-xl font-bold">Category Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage information for this category
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4">
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Input
              type="text"
              className="mt-2"
              label="Name"
              labelPlacement="outside"
              variant="bordered"
              defaultValue={dataCategory?.name}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Textarea
              className="mt-2"
              label="Description"
              labelPlacement="outside"
              variant="bordered"
              defaultValue={dataCategory?.description}
            />
          </Skeleton>
          <Button
            color="danger"
            className="disabled:bg-default-500 mt-2"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
