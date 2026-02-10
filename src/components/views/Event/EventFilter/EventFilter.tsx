import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import { ICategory } from "@/types/Category";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Fragment, useEffect } from "react";

const EventFilter = () => {
  const { control, dataCategory, setValue, isSuccessGetCategory } =
    useEventFilter();
  const {
    handleChangeCategory,
    currentCategory,
    currentIsOnline,
    handleChangeIsOnline,
    handleChangeIsFeatured,
    currentIsFeatured,
  } = useChangeUrl();

  useEffect(() => {
    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
      setValue("isOnline", `${currentIsOnline}`);
      setValue("isFeatured", `${currentIsFeatured}`);
    }
  }, [
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
    setValue,
    isSuccessGetCategory,
  ]);
  return (
    <div className="h-fit w-full rounded-xl p-4 shadow-md lg:sticky lg:top-20 lg:w-80">
      <h4 className="text-xl font-semibold">Filter</h4>
      <div className="mt-4 flex flex-col gap-4">
        {isSuccessGetCategory ? (
          <Fragment>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultSelectedKey={`${currentCategory}`}
                  label="Category"
                  labelPlacement="outside"
                  defaultItems={dataCategory?.data.data || []}
                  variant="bordered"
                  placeholder="Select Category"
                  onSelectionChange={(value) => {
                    onChange(value);
                    handleChangeCategory(value !== null ? `${value}` : "");
                  }}
                  listboxProps={{
                    itemClasses: {
                      base: ["data-[hover=true]:bg-default-0"],
                    },
                  }}
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={`${category?._id}`}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Controller
              name="isFeatured"
              control={control}
              render={({ field: { ...field } }) => (
                <Select
                  {...field}
                  label="Status Featured"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="select featured status"
                  defaultSelectedKeys={[`${currentIsFeatured}`]}
                  onChange={(e) => handleChangeIsFeatured(e.target.value)}
                >
                  {/* HeroUI date type mismatch temporary fix */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-expect-error */}
                  <SelectItem key="true" value="true">
                    Yes
                  </SelectItem>
                  {/* HeroUI date type mismatch temporary fix */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-expect-error */}
                  <SelectItem key="false" value="false">
                    No
                  </SelectItem>
                </Select>
              )}
            />
            <Controller
              name="isOnline"
              control={control}
              render={({ field: { ...field } }) => (
                <Select
                  {...field}
                  label="Status Online"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="select online status"
                  defaultSelectedKeys={[`${currentIsOnline}`]}
                  onChange={(e) => handleChangeIsOnline(e.target.value)}
                >
                  {/* HeroUI date type mismatch temporary fix */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-expect-error */}
                  <SelectItem key="true" value="true">
                    Online
                  </SelectItem>
                  {/* HeroUI date type mismatch temporary fix */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-expect-error */}
                  <SelectItem key="false" value="false">
                    Offline
                  </SelectItem>
                </Select>
              )}
            />
          </Fragment>
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFilter;
