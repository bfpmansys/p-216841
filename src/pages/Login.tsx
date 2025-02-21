
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { LoginForm } from "@/components/auth/LoginForm";
import { ChatButton } from "@/components/layout/ChatButton";

const Login: FC = () => {
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
          <LoginForm />
        </div>
      </main>
      <ChatButton />
    </div>
  );
};

export default Login;
