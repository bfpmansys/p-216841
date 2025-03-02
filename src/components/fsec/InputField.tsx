import { InputFieldProps } from "./types";

export const InputField: React.FC<InputFieldProps> = ({
  label,
  required = false,
  placeholder,
  type = "text",
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex-1 mb-5">
      <div className="text-base mb-[5px]">
        <span>{label}</span>
        {required && <span className="text-[#f00]">*</span>}
      </div>
      {placeholder ? (
        <div className="text-[rgba(0,0,0,0.27)] text-base font-bold">
          {placeholder}
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full bg-transparent outline-none ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
        />
      )}
      <div className="h-px bg-black mt-[5px]" />
    </div>
  );
};