const SidebarButton = ({ children, variant = "inactive" }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "active":
        return "rounded-lg bg-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-white";

      case "inactive":
        return "text-brand-dark-blue hover:text-brand-primary";

      default:
        return "text-brand-dark-blue hover:text-brand-primary";
    }
  };

  return (
    <li>
      <a
        href="/"
        className={`flex items-center gap-2 px-3 py-3 duration-300 hover:transition-all hover:duration-300 ${getVariantClasses()}`}
      >
        {children}
      </a>
    </li>
  );
};

export default SidebarButton;
