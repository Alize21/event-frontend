import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { Button, Card, CardBody, CardFooter, Divider } from "@heroui/react";

interface PropTypes {
  cart: ICart;
  dataTicketInCart: ITicket;
  onChangeQuantity: (type: "increment" | "decrement") => void;
}

const DetailEventCart = ({
  cart,
  dataTicketInCart,
  onChangeQuantity,
}: PropTypes) => {
  return (
    <Card radius="lg" className="border-none p-6 lg:sticky lg:top-[80px]">
      <CardBody className="gap-2">
        <h2 className="text-foreground-700 text-xl font-semibold">Cart</h2>
        {cart.ticket === "" ? (
          <p className="text-foreground-500">Your cart is empty</p>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="font-bold">{dataTicketInCart.name}</h4>
              <div className="flex items-center gap-2">
                <Button
                  size="md"
                  variant="bordered"
                  className="text-foreground-500 h-9 w-9 min-w-0 scale-80 rounded-full font-bold"
                  onPress={() => onChangeQuantity("decrement")}
                >
                  -
                </Button>
                <span className="text-lg font-bold">{cart.quantity}</span>
                <Button
                  size="md"
                  variant="bordered"
                  className="text-foreground-500 h-9 w-9 min-w-0 scale-80 rounded-full font-bold"
                  onPress={() => onChangeQuantity("increment")}
                >
                  +
                </Button>
              </div>
            </div>
            <p className="font-bold">
              {convertIDR(Number(dataTicketInCart.price) * cart.quantity)}
            </p>
          </div>
        )}
        <Divider />
      </CardBody>
      <CardFooter>
        <Button
          fullWidth
          color="danger"
          size="md"
          disabled={cart.quantity === 0}
          className="disabled:bg-danger-200"
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DetailEventCart;
