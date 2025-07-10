import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/axios'
import { toast } from 'react-toastify'
import type { CreateUserForm } from '../../types'

export default function NewUser() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateUserForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: '',
      status: false,
      profilePicture: '',
      address: {
        calle: '',
        numero: 0,
        ciudad: '',
        codigoPostal: ''
      }
    }
  })

  const onSubmit = async (data: CreateUserForm) => {
    try {
      console.log('payload:', data)
      await api.post<string>('/pruebatecnica/users', data)
      toast.success('Usuario creado correctamente')
      navigate('/')
    } catch (err: any) {
      const msg =
        typeof err.response?.data === 'string'
          ? err.response.data
          : err.message || 'Error al crear el usuario'
      toast.error(msg)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Crear Nuevo Usuario
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Nombre</label>
          <input
            {...register('firstName', { required: 'El nombre es obligatorio' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        {/* Apellidos */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Apellidos</label>
          <input
            {...register('lastName', { required: 'El apellido es obligatorio' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: { value: /^\S+@\S+$/i, message: 'Formato inválido' }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Teléfono</label>
          <input
            {...register('phoneNumber', { required: 'El teléfono es obligatorio' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Rol */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Rol</label>
          <select
            {...register('role', { required: 'El rol es obligatorio' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un rol</option>
            <option value="Usuario">Usuario</option>
            <option value="Admin">Admin</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        {/* Estado */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('status')}
            id="status"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="status" className="font-medium text-gray-700">
            Activo
          </label>
        </div>

        {/* Foto de perfil */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            URL Foto de perfil
          </label>
          <input
            type="url"
            {...register('profilePicture', {
              required: 'La URL es obligatoria'
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.profilePicture && (
            <p className="mt-1 text-sm text-red-600">
              {errors.profilePicture.message}
            </p>
          )}
        </div>

        {/* Dirección */}
        <div className="border-t pt-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Dirección</h2>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Calle</label>
            <input
              {...register('address.calle', {
                required: 'La calle es obligatoria'
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.address?.calle && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.calle.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Número</label>
            <input
              type="number"
              {...register('address.numero', {
                valueAsNumber: true,
                required: 'El número es obligatorio'
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.address?.numero && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.numero.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Ciudad</label>
            <input
              {...register('address.ciudad', {
                required: 'La ciudad es obligatoria'
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.address?.ciudad && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.ciudad.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Código Postal
            </label>
            <input
              {...register('address.codigoPostal', {
                required: 'El código postal es obligatorio'
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.address?.codigoPostal && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.codigoPostal.message}
              </p>
            )}
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          {isSubmitting ? 'Creando...' : 'Crear usuario'}
        </button>
      </form>
    </div>
  )
}
