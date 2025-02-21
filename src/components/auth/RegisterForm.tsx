
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const RegisterForm: FC = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Personal Information
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Establishment Information
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessType, setBusinessType] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            middle_name: middleName || null,
            last_name: lastName,
            birthday,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        const { error: establishmentError } = await supabase
          .from('establishments')
          .insert([
            {
              owner_id: data.user.id,
              business_name: businessName,
              business_address: businessAddress,
              business_type: businessType,
            },
          ]);

        if (establishmentError) throw establishmentError;

        toast({
          title: "Registration successful",
          description: "Please check your email to verify your account.",
        });
        navigate("/login");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to register",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] p-6 border-2 border-black rounded-lg">
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/28ec74ab6861245638ef0138e32ba7d04a5dc53e"
          alt="V-Fire Logo"
          className="w-16 h-16 mb-4"
        />
        <h1 className="text-2xl font-bold text-[#FE623F]">REGISTER</h1>
      </div>

      <form onSubmit={handleRegister} className="space-y-6">
        {step === 1 ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name:</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name (Optional):</Label>
              <Input
                id="middleName"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name:</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday">Birthday:</Label>
              <Input
                id="birthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password:</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-100 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-[#FE623F] text-white py-2 rounded-lg hover:bg-[#FE623F]/90 transition-colors"
              disabled={isLoading}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name:</Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address:</Label>
              <Input
                id="businessAddress"
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type:</Label>
              <Input
                id="businessType"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={isLoading}
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full bg-[#FE623F] text-white py-2 rounded-lg hover:bg-[#FE623F]/90 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
