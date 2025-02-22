
import { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Calendar } from "lucide-react";
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

  // Account Information
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

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
        toast({
          title: "Registration successful",
          description: "Welcome to V-Fire Inspect!",
        });
        navigate("/dashboard");
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
    <div className="w-full max-w-[400px] bg-white p-8 rounded-3xl shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <img
          src="/lovable-uploads/29214100-233c-41db-bd47-373ba4fa4cb3.png"
          alt="V-Fire Logo"
          className="w-8 h-10 mb-2"
        />
        <h1 className="text-2xl font-bold text-[#FF0000]">REGISTER ACCOUNT</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-[#FF0000] text-white' : 'bg-gray-300'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step === 1 ? 'bg-[#FF0000]' : 'bg-gray-300'}`} />
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-[#FF0000] text-white' : 'bg-gray-300'}`}>
            2
          </div>
        </div>
      </div>

      <form onSubmit={step === 2 ? handleRegister : undefined} className="space-y-4">
        {step === 1 ? (
          <>
            <div className="space-y-1">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="middleName" className="text-sm font-medium">
                Middle Name
              </Label>
              <Input
                id="middleName"
                placeholder="Enter Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="birthday" className="text-sm font-medium">
                Birthday<span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                  className="bg-gray-100"
                  disabled={isLoading}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="text-sm">
                Already have an Account?{" "}
                <Link to="/login" className="text-[#FF0000] hover:underline">
                  Log in
                </Link>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-[#FF0000] text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
                disabled={isLoading}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Register Email<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-100"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium">
                Password<span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
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
                  {showPassword ? <EyeOff size={20} className="text-green-500" /> : <Eye size={20} className="text-green-500" />}
                </button>
              </div>
              <ul className="text-xs text-gray-500 mt-1 space-y-1 pl-4">
                <li>Should have at least 8 characters</li>
                <li>Should have at least 1 upper case character</li>
                <li>Should have at least 1 lower case character</li>
                <li>Should have at least 1 number</li>
                <li>Should have at least 1 special character</li>
              </ul>
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password<span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-gray-100 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff size={20} className="text-green-500" /> : <Eye size={20} className="text-green-500" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-600 hover:text-gray-800"
              >
                Return
              </button>
              <button
                type="submit"
                className="bg-[#FF0000] text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-4">
              By continuing, you agree to V-fire{" "}
              <Link to="/terms" className="text-[#FF0000] hover:underline">
                Terms and Conditions
              </Link>
            </p>
          </>
        )}
      </form>
    </div>
  );
};
