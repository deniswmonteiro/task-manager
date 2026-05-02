const Label = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-brand-dark-blue text-sm font-semibold"
    >
      {children}
    </label>
  );
};

export default Label;
