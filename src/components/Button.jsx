import { tv } from "tailwind-variants";

const Button = ({ children, color, size, ...props }) => {
  const button = tv({
    base: "flex cursor-pointer items-center gap-1 rounded-md py-2 font-semibold duration-300 hover:transition-all hover:duration-300",
    variants: {
      color: {
        primary:
          "bg-brand-primary hover:shadow-brand-primary text-white hover:shadow-sm",
        secondary:
          "bg-brand-light-gray text-brand-dark-blue hover:shadow-brand-light-gray hover:shadow-sm",
        ghost: "text-brand-dark-gray hover:text-brand-dark-blue bg-transparent",
      },
      size: {
        sm: "px-3 text-xs",
        lg: "px-11 text-sm",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "sm",
    },
  });

  return (
    <button type="button" className={button({ color, size })} {...props}>
      {children}
    </button>
  );
};

export default Button;
