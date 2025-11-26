import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_EVENT } from "./Event.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import useEvent from "./useEvent";
import DropdownAction from "@/components/commons/DropdownAction";
import AddEventModal from "./AddEventModal";

const Event = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataEvents,
    isRefetchingEvents,
    isLoadingEvents,
    setSelectedId,
    refetchEvents,
  } = useEvent();

  const { setUrl } = useChangeUrl();

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

  useEffect(() => {
    if (isReady) setUrl();
  }, [isReady, setUrl]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="aspect-video w-36 rounded-lg object-cover"
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={100}
            />
          );
        case "isPublish":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Published" : "Not Published"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
                deleteEventModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, setSelectedId, deleteEventModal],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          renderCell={renderCell}
          columns={COLUMN_LISTS_EVENT}
          data={dataEvents?.data || []}
          emptyContent="No events found."
          isLoading={isLoadingEvents || isRefetchingEvents}
          buttonTopContentLabel="Add Event"
          onClickButtonTopContent={addEventModal.onOpen}
          totalPages={dataEvents?.pagination.totalPages}
        />
      )}
      <AddEventModal refetchEvents={refetchEvents} {...addEventModal} />
    </section>
  );
};

export default Event;
