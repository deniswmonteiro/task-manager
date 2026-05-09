import { tv } from "tailwind-variants";

const Button = ({ children, color, size, ...props }) => {
  const button = tv({
    base: "flex cursor-pointer items-center justify-center gap-1 rounded-md px-2 font-semibold duration-300 hover:transition-all hover:duration-300",
    variants: {
      color: {
        primary:
          "bg-brand-primary hover:shadow-brand-primary text-white hover:shadow-sm",
        secondary:
          "bg-brand-light-gray text-brand-dark-blue hover:shadow-brand-light-gray hover:shadow-sm",
        ghost: "text-brand-dark-gray hover:text-brand-dark-blue bg-transparent",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        lg: "h-10 w-38 text-sm",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 hover:shadow-none",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "sm",
    },
  });

  return (
    <button
      type="button"
      className={button({ color, size, disabled: props.disabled })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
