import { Mail, Lock } from 'lucide-react';
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent, role?: string) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // If a specific role button was clicked, redirect to that role's dashboard
        let redirectPath = "/dashboard";
        
        if (role === "inspector") {
          redirectPath = "/inspector-dashboard";
        } else if (role === "admin") {
          redirectPath = "/admin-dashboard";
        }

        toast({
          title: "Login successful",
          description: `Welcome back${role ? ` as ${role}` : ''}!`,
        });
        
        navigate(redirectPath);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + "/dashboard",
        },
      });

      if (error) throw error;

      toast({
        title: "Magic link sent",
        description: "Check your email for the login link",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send magic link",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


return (
  <div className="w-full max-w-[480px] p-8 border-2 border-gray-400 rounded-3xl">
    <div className="flex flex-col items-center mb-8">
      <img src="/images/logo.png" alt="V-Fire Logo" className="w-16 h-20 mb-4" />
      <h1 className="text-4xl font-bold text-[#FF0000]">LOG IN</h1>
    </div>

    <form className="space-y-6">
      {/* Email Input Field */}
      <div className="space-y-2">
        <Label htmlFor="email">E-mail:</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />  {/* Mail Icon */}
          <Input
            id="email"
            type="email"
            placeholder="Enter your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-100 pl-10" // Adding left padding to create space for icon
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password Input Field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password:</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />  {/* Lock Icon */}
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-100 pl-10 pr-10"
            disabled={isLoading}
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

      {/* Other Form Fields */}
      <div className="text-left">
        <button
          type="button"
          onClick={handleMagicLink}
          className="text-sm italic hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      {/* Role-specific Login Buttons */}
      <div className="space-y-3">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={(e) => handleLogin(e)}
            className="w-[150px] bg-[#FE623F] text-white py-2 rounded-2xl hover:bg-[#FE623F]/90 transition-colors disabled:opacity-50 font-bold font-['Poppins']"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "LOG IN"}
          </button>
        </div>
        
        <div className="flex justify-between px-4">
          <button
            type="button"
            onClick={(e) => handleLogin(e, "inspector")}
            className="bg-[#ffffff] text-black py-2 px-4 rounded-xl hover:bg-[#3F83FE]/90 transition-colors disabled:opacity-50 font-bold font-['Poppins'] text-sm"
            disabled={isLoading}
          >
            Inspector Login
          </button>
          
          <button
            type="button"
            onClick={(e) => handleLogin(e, "admin")}
            className="bg-[#ffffff] text-black py-2 px-4 rounded-xl hover:bg-[#4CAF50]/90 transition-colors disabled:opacity-50 font-bold font-['Poppins'] text-sm"
            disabled={isLoading}
          >
            Admin Login
          </button>
        </div>
      </div>

      <div className="text-center text-sm italic">
        <span className="">No Account Yet? </span>
        <Link to="/register" className="text-[#FE623F] hover:underline">
          Register Here
        </Link>
      </div>

      <div className="text-center text-xs ">
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