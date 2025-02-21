
import { FC } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesCarousel } from "@/components/home/FeaturesCarousel";
import { ChatButton } from "@/components/layout/ChatButton";

const Index: FC = () => {
  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <Header />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="faqs">
          <FeaturesCarousel />
        </section>
        <section id="about">
          {/* About section content will go here */}
        </section>
      </main>
      <ChatButton />
    </div>
  );
};

export default Index;
