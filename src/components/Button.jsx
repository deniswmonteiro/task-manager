const Button = ({ children, variant, size, ...props }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-brand-primary text-white hover:shadow-sm hover:shadow-brand-primary";

      case "secondary":
        return "bg-brand-light-gray text-brand-dark-blue hover:shadow-sm hover:shadow-brand-light-gray";

      case "ghost":
        return "bg-transparent text-brand-dark-gray hover:text-brand-dark-blue";

      default:
        return "bg-brand-primary text-white hover:shadow-sm hover:shadow-brand-primary";
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
