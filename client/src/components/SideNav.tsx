import { Link } from "react-router-dom";

export const SideNav = () => {
  return (
    <nav className="w-64 border-r border-gray-200">
      <div className="space-y-1 py-4">
        <Link
          to="/dashboard"
          className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          返佣数据
        </Link>
      </div>
    </nav>
  );
}