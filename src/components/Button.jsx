const Button = ({ children, variant }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#00adb5] text-white hover:shadow-sm hover:shadow-[#00adb5]";

      case "secondary":
        return "bg-transparent text-[#818181] hover:text-[#ef4444]";

      default:
        return "bg-[#00adb5] text-white hover:shadow-sm hover:shadow-[#00adb5]";
    }
  };

  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-xs font-semibold duration-300 hover:transition-all hover:duration-300 ${getVariantClasses()}`}
    >
      {children}
    </button>
  );
};

export default Button;
