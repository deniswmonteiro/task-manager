const SidebarButton = ({ children, variant = "inactive" }) => {
  const getVariantClasses = () => {
    if (variant === "active") {
      return "rounded-lg bg-[#e6f7f8] text-[#00adb5] hover:bg-[#00adb5] hover:text-[#e6f7f8]";
    } else {
      return "text-[#35383e] hover:text-[#00adb5]";
    }
  };

  return (
    <li>
      <a
        href="/"
        className={`block px-3 py-3 duration-300 hover:transition-all hover:duration-300 ${getVariantClasses()}`}
      >
        {children}
      </a>
    </li>
  );
};

export default SidebarButton;
