// src/views/UsersView.tsx

import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from '../../lib/axios'
import type { Meta, User } from '../../types'
import { Link } from 'react-router-dom'

export default function UsersView() {
  const [users, setUsers]     = useState<User[]>([])
  const [meta, setMeta]       = useState<Meta>({ totalItems:0, totalPages:0, currentPage:1, perPage:10 })
  const [loading, setLoading] = useState(true)

  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch]           = useState('')
  const [role, setRole]               = useState('')   // '' | 'Administrador' | 'Usuario'
  const [status, setStatus]           = useState('')   // '' | 'true' | 'false'

  const applySearch = () => {
    if (searchInput !== search) {
      setSearch(searchInput)
      setMeta(m => ({ ...m, currentPage: 1 }))
    }
  }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const { data } = await api.get<{ data: User[]; meta: Meta }>(
        '/pruebatecnica/users',
        { params: { page: meta.currentPage, limit: meta.perPage, search: search || undefined, role: role || undefined, status: status || undefined } }
      )
      setUsers(data.data)
      setMeta(data.meta)
    } catch (err: any) {
      console.error(err)
      toast.error(typeof err.response?.data === 'string' ? err.response.data : 'Error cargando usuarios')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return
    try {
      await api.delete(`/pruebatecnica/users/${id}`)
      toast.success('Usuario eliminado correctamente')
      await fetchUsers()
    } catch (err: any) {
      console.error(err)
      toast.error(typeof err.response?.data === 'string' ? err.response.data : 'Error al eliminar usuario')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [meta.currentPage, meta.perPage, search, role, status])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500">Cargando usuarios…</span>
      </div>
    )
  }

  return (
    <>
      {/* contenedor de react-toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Usuarios</h1>

        {/* — Controles de búsqueda y filtros */}
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre o email"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applySearch()}
            className="border rounded px-3 py-1 flex-1 min-w-[200px]"
          />
          <button
            onClick={applySearch}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition"
          >
            Buscar
          </button>

          <select
            value={role}
            onChange={e => { setRole(e.target.value); setMeta(m => ({ ...m, currentPage: 1 })) }}
            className="border rounded px-3 py-1"
          >
            <option value="">Todos los roles</option>
            <option value="Administrador">Administrador</option>
            <option value="Usuario">Usuario</option>
          </select>

          <select
            value={status}
            onChange={e => { setStatus(e.target.value); setMeta(m => ({ ...m, currentPage: 1 })) }}
            className="border rounded px-3 py-1"
          >
            <option value="">Todos los estados</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>

        {/* — Tabla de usuarios */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">#</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Avatar</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Nombre</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Teléfono</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Rol</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Activo</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Dirección</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? users.map(u => (
                <tr key={u.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-700">{u.id}</td>
                  <td className="px-4 py-3">
                    <img
                      src={u.profilePicture}
                      alt={`${u.firstName} ${u.lastName}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.firstName} {u.lastName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.phoneNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.role}</td>
                  <td className="px-4 py-3">
                    {u.status
                      ? <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">Sí</span>
                      : <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800">No</span>
                    }
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {u.address.calle}, {u.address.numero}<br/>
                    {u.address.ciudad} • {u.address.codigoPostal}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex items-center space-x-2">
                      <Link
  to={`/users/${u.id}/update`}
  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition"
>
  Editar
</Link>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-gray-500">
                    No hay usuarios que mostrar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* — Paginación */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            Página {meta.currentPage} de {meta.totalPages}
          </span>
          <div className="space-x-2">
            <button
              onClick={() => setMeta(m => ({ ...m, currentPage: m.currentPage - 1 }))}
              disabled={meta.currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setMeta(m => ({ ...m, currentPage: m.currentPage + 1 }))}
              disabled={meta.currentPage === meta.totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
