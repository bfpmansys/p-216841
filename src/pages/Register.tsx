
import { FC } from "react";
import { Header } from "@/components/layout/Header";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ChatButton } from "@/components/layout/ChatButton";

const Register: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 font-['Poppins']">
      <Header />
      <main className="flex items-center justify-center min-h-[calc(100vh-116px)] max-sm:min-h-[calc(100vh-80px)] p-4">
        <RegisterForm />
      </main>
      <ChatButton />
    </div>
  );
};

export default Register;
