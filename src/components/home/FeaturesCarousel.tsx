import { FC, useState } from "react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0302336531ba96792f6cd744e9bb3d244fa4ec27",
    title: "Success Stories",
    altText: "Success Stories",
  },
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e381d0c91aedf4ee9bfdd779a0d0d6978fe53fc7",
    title: "Fire Safety Training Sessions",
    altText: "Fire Safety Training",
  },
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ffb90c3d3187aabb591f73a232e60e7b0c681ad0",
    title: "Team at Work",
    altText: "Team at Work",
  },
];

export const FeaturesCarousel: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : features.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < features.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      className="flex items-center justify-center gap-10 p-10 max-md:flex-col"
      aria-label="Features"
    >
      <button
        onClick={handlePrev}
        className="focus:outline-none"
        aria-label="Previous feature"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/91b7dc755b18b5a28c33a7208450cfa43b959ae1"
          alt="Previous"
          className="w-[100px] h-[100px] cursor-pointer max-sm:w-[60px] max-sm:h-[60px]"
          loading="lazy"
        />
      </button>

      <div className="flex gap-[60px] max-md:flex-col max-md:items-center">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      <button
        onClick={handleNext}
        className="focus:outline-none"
        aria-label="Next feature"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3906d11ea7d5918ba358e53d13789a0cd36f9e49"
          alt="Next"
          className="w-[100px] h-[100px] cursor-pointer max-sm:w-[60px] max-sm:h-[60px]"
          loading="lazy"
        />
      </button>
    </section>
  );
};
