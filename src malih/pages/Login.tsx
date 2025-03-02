
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { LoginForm } from "@/components/auth/LoginForm";
import { ChatButton } from "@/components/layout/ChatButton";

const Login: FC = () => {
  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <Header/>
      <main className="flex mt-12 min-h-[calc(100vh-200px)] max-sm:min-h-[calc(100vh-100px)]">
        <div className="hidden md:flex w-1/2 justify-center items-center">
          <img
            src="/images/hero.png"
            alt="BFP Team"
            className="w-full h-half object-cover"
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
