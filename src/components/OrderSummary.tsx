import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
}

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const selectedItems = items.filter((item) => item.quantity > 0);
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Card className="border-0 shadow-lg bg-primary">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-white">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedItems.length === 0 ? (
          <p className="text-white/70 text-sm">No items selected yet</p>
        ) : (
          <>
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 border-b border-white/20 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-sm text-white/70">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-accent">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </>
        )}
        <div className="pt-4 border-t border-white/20">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-white">TOTAL PRICE:</span>
            <span className="font-bold text-xl text-accent">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
