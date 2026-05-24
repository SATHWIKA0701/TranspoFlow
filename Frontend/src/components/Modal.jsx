const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center mb-5 pb-4 border-b">
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-500 text-2xl"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;