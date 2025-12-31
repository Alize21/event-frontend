import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { Fragment, Key, ReactNode, useCallback, useState } from "react";
import { COLUMN_LISTS_TICKET } from "./TicketTab.constant";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import { ITicket } from "@/types/Ticket";

const TicketTab = () => {
  const { dataTicket, refetchTicket, isPendingTicket, isRefetchingTicket } =
    useTicketTab();
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const [selectedDataTicket, setSelectedDataTicket] = useState<ITicket | null>(
    null,
  );

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                setSelectedDataTicket(ticket as ITicket);
                deleteTicketModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteTicketModal, updateTicketModal],
  );

  return (
    <Fragment>
      <Card className="w-full p-4">
        <CardHeader
          className="items-center justify-between"
          onSubmit={() => {}}
        >
          <div className="flex flex-col items-center">
            <h1 className="w-full text-xl font-bold">Event Ticket</h1>
            <p className="text-small text-default-400 w-full">
              Manage ticket for this event
            </p>
          </div>
          <Button color="danger" onPress={addTicketModal.onOpen}>
            Add New Ticket
          </Button>
        </CardHeader>
        <CardBody className="pt-0">
          <DataTable
            renderCell={renderCell}
            columns={COLUMN_LISTS_TICKET}
            data={dataTicket || []}
            emptyContent="No tickets found."
            isLoading={isPendingTicket || isRefetchingTicket}
            showSearch={false}
            showLimit={false}
            totalPages={1}
          />
        </CardBody>
      </Card>
      <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />
      <DeleteTicketModal
        {...deleteTicketModal}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
        refetchTicket={refetchTicket}
      />
    </Fragment>
  );
};

export default TicketTab;
