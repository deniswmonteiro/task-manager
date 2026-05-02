import Label from "./Label";

const Select = ({ label, id, options, ref, ...props }) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative w-full">
        <select
          className="w-full appearance-none rounded-lg border border-solid border-[#cccccc] px-4 py-3 pr-10 text-sm outline-0 duration-300 focus:border-[#00adb5] focus:duration-300"
          id={id}
          ref={ref}
          {...props}
        >
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled ?? false}
            >
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#9a9c9f]"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
