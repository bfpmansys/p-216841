
import { FC } from "react";
import { Header } from "@/components/layout/Header";
import { ChatButton } from "@/components/layout/ChatButton";

const Terms: FC = () => {
  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#FE623F] mb-6">Terms and Conditions</h1>
        <div className="prose prose-lg">
          <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to V-Fire Inspect. By using our services, you agree to these terms and conditions.
          </p>

          <h2 className="text-xl font-semibold mb-4">2. User Registration</h2>
          <p className="mb-4">
            Users must provide accurate and complete information during registration.
            Users are responsible for maintaining the confidentiality of their account credentials.
          </p>

          <h2 className="text-xl font-semibold mb-4">3. Establishment Information</h2>
          <p className="mb-4">
            Users must provide accurate establishment details for fire inspection purposes.
            False information may result in account termination.
          </p>

          <h2 className="text-xl font-semibold mb-4">4. Data Privacy</h2>
          <p className="mb-4">
            We protect your personal information in accordance with data privacy laws.
            Your data will only be used for fire inspection management purposes.
          </p>
        </div>
      </main>
      <ChatButton />
    </div>
  );
};

export default Terms;
