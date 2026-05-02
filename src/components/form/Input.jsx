import Label from "./Label";

const Input = ({ label, id, ref, ...props }) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <Label htmlFor={id}>{label}</Label>
      <input
        type="text"
        className="text-brand-dark-blue placeholder:text-brand-text-gray focus:border-brand-primary border-brand-light-gray w-full rounded-lg border border-solid px-4 py-3 text-sm outline-0 duration-300 focus:duration-300"
        id={id}
        ref={ref}
        {...props}
      />
    </div>
  );
};

export default Input;
