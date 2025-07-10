import  { useEffect } from "react"
import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function UserLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("TOKEN")
    if (!token) {
      toast.error("Tienes que iniciar sesión primero")
      navigate("/auth/login", { replace: true })
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("TOKEN")
    navigate("/auth/login", { replace: true })
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="px-6 py-8 border-b">
          <h2 className="text-2xl font-bold text-blue-600">Mi App</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            Usuarios
          </NavLink>
          <NavLink
            to="/users/new"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            Nuevo Usuario
          </NavLink>
        </nav>
        <div className="px-6 py-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">CRUD de Usuarios</h1>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
