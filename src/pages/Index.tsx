import { useState } from "react";
import DessertCard from "@/components/DessertCard";
import OrderSummary from "@/components/OrderSummary";
import CustomerForm from "@/components/CustomerForm";
import { toast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import logo from "@/assets/logo.png";
import treslechesImg from "@/assets/tresleches.png";
import applepierollImg from "@/assets/appliepieroll.png";
import cookiebutterrollImg from "@/assets/cookiebutterroll.png";
// import blueberrysconeImg from "@/assets/blueberryscone.png";
import bananachocchipmuffinImg from "@/assets/bananachocchipmuffin.png";
import pumpkincrumbcakeImg from "@/assets/pumpkincrumbcake.png";
import lemonraspberrymuffinsImg from "@/assets/lemonraspberrymuffins.png";
// import raspberrywhitechocolatesconeImg from "@/assets/raspberry-white-chocolate-scones-2024.jpg";
import blueberrycobblerrollImg from "@/assets/blueberrycobblerroll.png";
import strawberryshortcakerollImg from "@/assets/strawberryshortcakerolls.png";
import lemonraspberryloafImg from "@/assets/lemonraspberryloaf.png";
import lemonblueberryloafImg from "@/assets/lemonblueberryloaf.png";
import peanutbutterchunkcookieImg from "@/assets/peanutbutterchunkcookie.png";
import oatmealchocolatechipcookieImg from "@/assets/oatmealchocolatechipcookies.png";

interface Dessert {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const initialDesserts: Dessert[] = [
  {
    id: "1",
    name: "Cinnamon Rolls: Tres Leches",
    price: 9.00,
    image: treslechesImg,
    quantity: 0,
  },
  {
    id: "2",
    name: "Cinnamon Rolls: Apple Pie",
    price: 11.00,
    image: applepierollImg,
    quantity: 0,
  },
  {
    id: "3",
    name: "Cinnamon Rolls: Cookie Butter",
    price: 11.00,
    image: cookiebutterrollImg,
    quantity: 0,
  },
  {
    id: "4",
    name: "Cinnamon Rolls: Blueberry Cobbler",
    price: 11.00,
    image: blueberrycobblerrollImg,
    quantity: 0,
  },
  {
    id: "5",
    name: "Cinnamon Rolls: Strawberry Shortcake",
    price: 11.00,
    image: strawberryshortcakerollImg,
    quantity: 0,
  },
  // {
  //   id: "6",
  //   name: "Scones: Blueberry",
  //   price: 4.00,
  //   image: blueberrysconeImg,
  //   quantity: 0,
  // },
  // {
  //   id: "7",
  //   name: "Scones: Raspberry White Chocolate",
  //   price: 4.00,
  //   image: raspberrywhitechocolatesconeImg,
  //   quantity: 0,
  // },
  {
    id: "6",
    name: "Muffins: Banana Chocolate Chip",
    price: 3.00,
    image: bananachocchipmuffinImg,
    quantity: 0,
  },
  {
    id: "7",
    name: "Muffins: Lemon Raspberry",
    price: 3.00,
    image: lemonraspberrymuffinsImg,
    quantity: 0,
  },
  {
    id: "8",
    name: "Loaf: Pumpkin Crumble Cake",
    price: 14.00,
    image: pumpkincrumbcakeImg,
    quantity: 0,
  },
  {
    id: "9",
    name: "Loaf: Lemon Raspberry",
    price: 14.00,
    image: lemonraspberryloafImg,
    quantity: 0,
  },{
    id: "10",
    name: "Loaf: Lemon Blueberry",
    price: 14.00,
    image: lemonblueberryloafImg,
    quantity: 0,
  },
  {
    id: "11",
    name: "Cookies: Peanut Butter Chunk",
    price: 4.00,
    image: peanutbutterchunkcookieImg,
    quantity: 0,
  },{
    id: "12",
    name: "Cookies: Oatmeal Chocolate Chip",
    price: 4.00,
    image: oatmealchocolatechipcookieImg,
    quantity: 0,
  },
];

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Index = () => {
  const [desserts, setDesserts] = useState<Dessert[]>(initialDesserts);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
  });

  const handleQuantityChange = (id: string, quantity: number) => {
    setDesserts((prev) =>
      prev.map((dessert) =>
        dessert.id === id ? { ...dessert, quantity } : dessert
      )
    );
  };

  const handleBlur = (field: "name" | "phone" | "email") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const hasSelectedItems = desserts.some((d) => d.quantity > 0);
  const isPhoneValid = validatePhone(phone);
  const isEmailValid = validateEmail(email);
  const isFormValid =
    hasSelectedItems &&
    name.trim() !== "" &&
    isPhoneValid &&
    isEmailValid;

  const errors = {
    name: touched.name && name.trim() === "" ? "Name is required" : "",
    phone: touched.phone && !isPhoneValid ? "Please enter a valid phone number" : "",
    email: touched.email && !isEmailValid ? "Please enter a valid email address" : "",
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    const selectedItems = desserts.filter((d) => d.quantity > 0);
    const total = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    try {
      await addDoc(collection(db, "orderRequests"), {
        customer: {
          name,
          phone,
          email,
          message,
        },
        items: selectedItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      toast({
        title: "Order Submitted!",
        description: `Thank you ${name}! Your order of $${total.toFixed(2)} has been received. We'll contact you shortly to confirm.`,
        variant: "success",
      });

      // Reset form
      setDesserts(initialDesserts);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setTouched({ name: false, phone: false, email: false });
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-b from-pink-100 to-white py-6">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <img
            src={logo}
            alt="Ho-Made Baked Goods by Sarah"
            className="h-40 md:h-56 w-auto mb-4"
          />
          <p className="text-lg text-primary">Order your favorite baked goods online</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Desserts Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Our Desserts</h2>
              <p className="text-muted-foreground">
                Select the quantity of each dessert you'd like to order
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {desserts.map((dessert) => (
                <DessertCard
                  key={dessert.id}
                  {...dessert}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
          </div>

          {/* Order Summary & Form Section */}
          <div className="space-y-6">
            <OrderSummary items={desserts} />
            
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-accent mb-4">Your Information</h3>
              <CustomerForm
                name={name}
                phone={phone}
                email={email}
                message={message}
                onNameChange={setName}
                onPhoneChange={setPhone}
                onEmailChange={setEmail}
                onMessageChange={setMessage}
                onBlur={handleBlur}
                errors={errors}
                onSubmit={handleSubmit}
                isValid={isFormValid}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-6 mt-12">
        <div className="container mx-auto px-4 text-center flex flex-col items-center gap-3">
          <img src={logo} alt="Ho-Made Baked Goods by Sarah" className="h-16 w-auto" />
          <p className="opacity-90">© 2026 Ho-Made Baked Goods by Sarah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
