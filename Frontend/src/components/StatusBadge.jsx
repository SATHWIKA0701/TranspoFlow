const StatusBadge = ({ status }) => {
  const colors = {
    Available: "bg-green-100 text-green-700",
    Assigned: "bg-blue-100 text-blue-700",
    Maintenance: "bg-orange-100 text-orange-700",
    Pending: "bg-amber-100 text-amber-700",
    Dispatched: "bg-indigo-100 text-indigo-700",
    "In Transit": "bg-blue-100 text-blue-700",
    Delivered: "bg-emerald-100 text-emerald-700",
    Delayed: "bg-red-100 text-red-700",
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-blue-100 text-blue-700",
    Low: "bg-slate-100 text-slate-700"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[status] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
};

export default StatusBadge;