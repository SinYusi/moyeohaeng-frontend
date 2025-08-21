interface TextInputProps {
  label?: string;
  placeholder: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  label = "",
  placeholder,
  type = "text",
  required = false,
  onChange,
}: TextInputProps) => {
  return (
    <div>
      {label && (
        <p className="m-0 text-[#5a6572] text-sm mb-1.5">
          {label}
          {required && <span className="text-[#f8536b]">*</span>}
        </p>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="border border border-[#7b8482] focus:border-[#3864f4] focus:outline-none p-[11px] rounded w-full"
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
