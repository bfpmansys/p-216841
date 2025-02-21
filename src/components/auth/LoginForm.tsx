
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically integrate with your authentication service
    toast({
      title: "Login Attempted",
      description: "This is a demo login. Integration with authentication service needed.",
    });
  };

  return (
    <div className="w-full max-w-[400px] p-6">
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/28ec74ab6861245638ef0138e32ba7d04a5dc53e"
          alt="V-Fire Logo"
          className="w-16 h-16 mb-4"
        />
        <h1 className="text-2xl font-bold text-[#FE623F]">LOG IN</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail:</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password:</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-100 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-gray-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#FE623F] text-white py-2 rounded-lg hover:bg-[#FE623F]/90 transition-colors"
        >
          LOG IN
        </button>

        <div className="text-center text-sm">
          <span className="text-gray-600">No Account Yet? </span>
          <Link to="/register" className="text-[#FE623F] hover:underline">
            Register Here
          </Link>
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>
            By continuing, you agree to
            <br />
            V-fire inspect{" "}
            <Link to="/terms" className="text-[#FE623F] hover:underline">
              Terms and Conditions
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
