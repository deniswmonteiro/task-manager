import { NavLink, useLocation } from "react-router-dom";
import { tv } from "tailwind-variants";

const SidebarLink = ({ activePaths = [], children, to }) => {
  const { pathname } = useLocation();

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

  const isPathActive = activePaths.some(path => pathname.startsWith(path));

  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          link({ state: isActive || isPathActive ? "active" : "inactive" })
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default SidebarLink;
