import React from "react";

const DashboardCard = ({ icon, value, description }) => {
  return (
    <div className="bg-brand-white flex h-full min-h-37.5 flex-col items-center justify-center gap-1.25 rounded-xl p-2">
      <div className="flex items-center gap-2">
        {React.cloneElement(icon, { className: "w-6 h-6 text-brand-primary" })}
        <p className="text-brand-dark-blue text-3xl font-semibold">{value}</p>
      </div>
      <span className="text-brand-dark-blue">{description}</span>
    </div>
  );
};

export default DashboardCard;
