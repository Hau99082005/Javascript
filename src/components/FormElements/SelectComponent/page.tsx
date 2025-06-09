// components/FormElements/SelectComponent/page.tsx
export default function SelectComponent({
  label,
  value,
  onChange,
  options = [],
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  options?: { label: string; value: string }[];
}) {
  return (
    <div className="relative w-full">
      <label className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-700 font-semibold">
        {label}
      </label>
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-500 rounded-lg px-4 py-3 text-base bg-white focus:outline-none focus:border-black"
        aria-label={label}
      >
        <option value="">Chọn một giá trị</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
