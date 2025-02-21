
import { FC } from "react";
import { Header } from "@/components/layout/Header";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ChatButton } from "@/components/layout/ChatButton";

const Register: FC = () => {
  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <Header />
      <main className="flex min-h-[calc(100vh-116px)] max-sm:min-h-[calc(100vh-80px)]">
        <div className="hidden md:flex w-1/2 bg-gray-100">
          <img
            src="/lovable-uploads/fa06cbd2-5b53-4d6d-a5bf-da09d22e5f1c.png"
            alt="BFP Team"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <RegisterForm />
        </div>
      </main>
      <ChatButton />
    </div>
  );
};

export default Register;
