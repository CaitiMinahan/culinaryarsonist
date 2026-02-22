import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";

interface DessertCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
}

const DessertCard = ({
  id,
  name,
  price,
  image,
  quantity,
  onQuantityChange,
}: DessertCardProps) => {
  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(id, quantity + 1);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4 text-center">
        <h3 className="font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-accent font-bold text-lg mb-3">${price.toFixed(2)}</p>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            onClick={handleDecrease}
            disabled={quantity === 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-semibold text-foreground">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            onClick={handleIncrease}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DessertCard;
