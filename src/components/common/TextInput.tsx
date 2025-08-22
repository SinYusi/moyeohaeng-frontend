import { useState } from "react";
import eyeOpen from "../../assets/images/eye.svg";
import eyeClosed from "../../assets/images/eye-closed.svg";

interface TextInputProps {
  label?: string;
  placeholder: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  required?: boolean;
  value?: string;
  autoComplete?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  label = "",
  placeholder,
  type = "text",
  required = false,
  value,
  autoComplete,
  maxLength,
  onChange,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  // 비밀번호 타입일 때 가시성 토글 처리
  const handleTogglePassword = () => {
    if (type === "password") {
      setShowPassword(!showPassword);
      setInputType(showPassword ? "password" : "text");
    }
  };

  return (
    <div>
      {label && (
        <p className="m-0 text-[#5a6572] text-sm mb-1.5">
          {label}
          {required && <span className="text-[#f8536b]">*</span>}
        </p>
      )}
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          aria-label={label || undefined}
          required={required}
          value={value}
          autoComplete={autoComplete}
          maxLength={maxLength}
          className="border border-[#7b8482] focus:border-[#3864f4] focus:outline-none p-[13px] rounded w-full pr-12"
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <img
              src={showPassword ? eyeOpen : eyeClosed}
              alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              className="w-5 h-5"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;
