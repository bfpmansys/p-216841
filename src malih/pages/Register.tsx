
import { FC } from "react";
import { Header } from "@/components/layout/Header";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ChatButton } from "@/components/layout/ChatButton";

const Register: FC = () => {
  return (
    <div className="min-h-screen font-['Poppins']">
      <Header />
      <main className="flex mt-12 min-h-[calc(100vh-200px)] max-sm:min-h-[calc(100vh-100px)]">
        <div className="hidden md:flex w-1/2 justify-center items-center">
          <img
            src="/images/hero.png"
            alt="BFP Team"
            className="w-full h-half object-cover"
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
