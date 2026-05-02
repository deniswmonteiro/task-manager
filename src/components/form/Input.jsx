import Label from "./Label";

const Input = ({ label, id, ref, ...props }) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <Label htmlFor={id}>{label}</Label>
      <input
        type="text"
        className="w-full rounded-lg border border-solid border-[#cccccc] px-4 py-3 text-sm outline-0 duration-300 placeholder:text-[#9a9c9f] focus:border-[#00adb5] focus:duration-300"
        id={id}
        ref={ref}
        {...props}
      />
    </div>
  );
};

export default Input;
