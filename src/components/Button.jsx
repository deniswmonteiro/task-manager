const Button = ({ children, variant, size, ...props }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#00adb5] text-white hover:shadow-sm hover:shadow-[#00adb5]";

      case "secondary":
        return "bg-[#eeeeee] text-[#35383e] hover:shadow-sm hover:shadow-[#eeeeee]";

      case "ghost":
        return "bg-transparent text-[#818181] hover:text-[#35383e]";

      default:
        return "bg-[#00adb5] text-white hover:shadow-sm hover:shadow-[#00adb5]";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3  text-xs";

      case "lg":
        return "px-11 text-sm";

      default:
        return "px-3 text-xs";
    }
  };

  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center gap-1 rounded-md py-2 font-semibold duration-300 hover:transition-all hover:duration-300 ${getVariantClasses()} ${getSizeClasses()}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
