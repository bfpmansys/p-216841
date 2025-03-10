import React from "react";

interface Step {
  number: number;
  text: string;
}
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps: Step[] = [
    { number: 1, text: "Fill out the Form" },
    { number: 2, text: "Upload the Requirements" },
    { number: 3, text: "Confirm and Submit" },
  ];

  return (
    <div className="flex items-center bg-white mb-5 p-[15px] rounded-[20px] max-sm:flex-col max-sm:items-start">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center max-sm:mb-2.5">
            <div
              className={`rounded-full w-[37px] h-[37px] flex items-center justify-center ${
                step.number <= currentStep ? "bg-[#FE623F]" : "bg-[#FE623F] bg-opacity-30"
              }`}
            >
              <span
                className={`text-base font-semibold ${
                  step.number <= currentStep ? "text-white" : "text-black text-opacity-30"
                }`}
              >
                {step.number}
              </span>
            </div>
            <div
              className={`text-base ml-[15px] ${
                step.number <= currentStep ? "text-black" : "text-black text-opacity-30"
              }`}
            >
              {step.text}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-px mx-5 my-0 max-sm:hidden ${
                currentStep > index + 1 ? "bg-black" : "bg-gray-300"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
