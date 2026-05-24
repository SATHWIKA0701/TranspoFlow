import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <h1 className="text-5xl font-bold text-slate-800">404</h1>
        <p className="text-slate-500 mt-3">Page not found</p>
        <Link to="/dashboard" className="inline-block mt-6 bg-blue-600 text-white px-5 py-3 rounded-xl">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;