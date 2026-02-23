import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CustomerFormProps {
  name: string;
  phone: string;
  email: string;
  message: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onBlur: (field: "name" | "phone" | "email") => void;
  errors: {
    name: string;
    phone: string;
    email: string;
  };
  onSubmit: () => void;
  isValid: boolean;
}

const CustomerForm = ({
  name,
  phone,
  email,
  message,
  onNameChange,
  onPhoneChange,
  onEmailChange,
  onMessageChange,
  onBlur,
  errors,
  onSubmit,
  isValid,
}: CustomerFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-black">Name *</Label>
          <Input
            id="name"
            placeholder="Your full name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            onBlur={() => onBlur("name")}
            className={`bg-white border-gray-300 text-black placeholder:text-gray-400 ${errors.name ? "border-destructive" : ""}`}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-black">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Your phone number"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            onBlur={() => onBlur("phone")}
            className={`bg-white border-gray-300 text-black placeholder:text-gray-400 ${errors.phone ? "border-destructive" : ""}`}
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-black">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onBlur={() => onBlur("email")}
          className={`bg-white border-gray-300 text-black placeholder:text-gray-400 ${errors.email ? "border-destructive" : ""}`}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-black">Special Requests</Label>
        <Textarea
          id="message"
          placeholder="Any special requests or notes for your order..."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          className="bg-white border-gray-300 text-black placeholder:text-gray-400 min-h-[100px]"
        />
      </div>
      <Button
        onClick={onSubmit}
        disabled={!isValid}
        className="w-full bg-[#4a0500] border-2 border-white hover:bg-[#2a0300] !text-white font-semibold py-6 text-lg transition-colors"
      >
        SUBMIT ORDER
      </Button>
    </div>
  );
};

export default CustomerForm;
