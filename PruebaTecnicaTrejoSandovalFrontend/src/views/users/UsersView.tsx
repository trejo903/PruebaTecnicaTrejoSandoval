import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../lib/axios'

interface Address {
  id: number
  calle: string
  numero: number
  ciudad: string
  codigoPostal: string
}

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  role: string
  status: boolean
  profilePicture: string
  createdAt: string
  updatedAt: string
  address: Address
}

export default function UsersView() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get<{
          data: User[]
        }>('/pruebatecnica/users')
        setUsers(data.data)
      } catch (err: any) {
        toast.error(
          typeof err.response?.data === 'string'
            ? err.response.data
            : 'Error cargando usuarios'
        )
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500">Cargando usuarios…</span>
      </div>
    )
  }

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Usuarios</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">#</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Nombre</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Teléfono</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Rol</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Activo</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Dirección</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 text-sm text-gray-700">{u.id}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {u.firstName} {u.lastName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{u.email}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{u.phoneNumber}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{u.role}</td>
                <td className="px-4 py-3">
                  {u.status
                    ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Sí</span>
                    : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">No</span>
                  }
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {u.address.calle}, {u.address.numero}<br/>
                  {u.address.ciudad} • {u.address.codigoPostal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
