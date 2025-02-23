import React from "react";

interface FormSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <div className={`bg-white p-6 shadow-sm rounded-lg ${className}`}>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-gray-600 mb-4">{subtitle}</p>}
      <div>{children}</div>
    </div>
  );
};
