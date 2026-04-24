const Button = ({ children, variant, ...props }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#00adb5] text-white hover:shadow-sm hover:shadow-[#00adb5]";

      case "ghost":
        return "bg-transparent text-[#818181] hover:text-black";

      default:
        return "bg-[#00adb5] text-white hover:shadow-sm hover:shadow-[#00adb5]";
    }
  };

  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-xs font-semibold duration-300 hover:transition-all hover:duration-300 ${getVariantClasses()}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
