const Input = ({ label, id, ...props }) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        type="text"
        className="w-full rounded-lg border border-solid border-[#cccccc] px-4 py-3 text-sm outline-0 duration-300 placeholder:text-[#9a9c9f] focus:border-[#00adb5] focus:duration-300"
        id={id}
        {...props}
      />
    </div>
  );
};

export default Input;
