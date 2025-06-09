// components/FormElements/InputComponent/page.tsx

export interface InputComponentProps {
  id?: string;
  type?: string;
  label: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
}

export default function InputComponent({
  label,
  placeholder,
  type,
  onChange,
  value,
}: InputComponentProps) {
  return (
    <div className="relative">
      <p className="pt-0 pr-2 pb-0 pl-2 absolute -mt-3 ml-2 font-medium text-gray-600 bg-white">
        {label}
      </p>
      <input
        placeholder={placeholder}
        type={type || 'text'}
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        className="border placeholder-gray-300 focus:outline-none focus:border-black
          w-full pt-4 pr-4 pb-4 pl-4 text-base block bg-white border-gray-500 rounded-lg"
      />
    </div>
  );
}
