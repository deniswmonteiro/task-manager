import { tv } from "tailwind-variants";

const SidebarLink = ({ children, state, href }) => {
  const link = tv({
    base: "flex items-center gap-2 px-3 py-3 duration-300 hover:transition-all hover:duration-300",
    variants: {
      state: {
        active:
          "bg-brand-primary/20 text-brand-primary hover:bg-brand-primary rounded-lg hover:text-white",
        inactive: "text-brand-dark-blue hover:text-brand-primary",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  });

  return (
    <li>
      <a href={href} className={link({ state })}>
        {children}
      </a>
    </li>
  );
};

export default SidebarLink;
