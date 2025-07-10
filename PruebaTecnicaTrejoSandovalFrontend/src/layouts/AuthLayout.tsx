
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
  const { pathname } = useLocation()
  const title =
    pathname === '/auth/register'
      ? 'Crear Cuenta'
      : pathname === '/auth/login'
      ? 'Iniciar Sesión'
      : 'Autenticación'

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Cabecera con degradado */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <h2 className="text-center text-2xl font-bold text-white">{title}</h2>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  )
}
