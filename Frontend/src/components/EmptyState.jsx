const EmptyState = ({ title, message, icon: Icon }) => {
  return (
    <div className="bg-white rounded-2xl p-10 text-center shadow-lg">
      {Icon && (
        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
          <Icon size={34} />
        </div>
      )}
      <h2 className="text-2xl font-bold text-slate-700">{title}</h2>
      <p className="text-slate-500 mt-2">{message}</p>
    </div>
  );
};

export default EmptyState;