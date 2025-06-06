import { Link } from "react-router-dom"
import { logout } from "../api/user"

export const Header = () => {
  const handlerLogout = async () => {
    await logout()
    localStorage.removeItem('token')
    location.replace('/login')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="p-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-gray-900">
              返佣系统
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 text-sm cursor-pointer" onClick={handlerLogout}>
              退出登录
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}