
import { FormSectionProps } from "./types";

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <div className={`shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white mb-5 p-5 rounded-[20px] max-sm:p-[15px] ${className}`}>
      <div className="text-base font-bold mb-2.5">{title}</div>
      {subtitle && <div className="text-base mb-5">{subtitle}</div>}
      {children}
    </div>
  );
};