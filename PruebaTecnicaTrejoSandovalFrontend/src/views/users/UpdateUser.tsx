// src/views/UpdateUser.tsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../lib/axios';
import { toast } from 'react-toastify';
import type { CreateUserForm, User } from '../../types';

export default function UpdateUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateUserForm>();

  // 1. Carga datos actuales
  useEffect(() => {
    if (!id) return;
    api.get<User>(`/pruebatecnica/users/${id}`)
      .then(({ data }) => {
        // resetea el formulario con los valores del backend
        reset({
          firstName:      data.firstName,
          lastName:       data.lastName,
          email:          data.email,
          phoneNumber:    data.phoneNumber,
          role:           data.role,
          status:         data.status,
          profilePicture: data.profilePicture,
          address: {
            calle:        data.address.calle,
            numero:       Number(data.address.numero),
            ciudad:       data.address.ciudad,
            codigoPostal: data.address.codigoPostal
          }
        });
      })
      .catch(err => {
        toast.error('No se pudo cargar el usuario');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id, reset]);

  // 2. Envío de actualización
  const onSubmit = async (form: CreateUserForm) => {
    try {
      await api.put(`/pruebatecnica/users/${id}`, form);
      toast.success('Usuario actualizado correctamente');
      navigate('/');
    } catch (err: any) {
      const msg =
        typeof err.response?.data === 'string'
          ? err.response.data
          : 'Error al actualizar usuario';
      toast.error(msg);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Cargando datos del usuario…</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Actualizar Usuario #{id}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* — El mismo formulario que NewUser, pero usando register(...) */}
        {/* Nombre */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Nombre</label>
          <input
            {...register('firstName', { required: 'El nombre es obligatorio' })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && <p className="mt-1 text-red-600">{errors.firstName.message}</p>}
        </div>

        {/* Apellidos */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Apellidos</label>
          <input
            {...register('lastName', { required: 'El apellido es obligatorio' })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && <p className="mt-1 text-red-600">{errors.lastName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'El email es obligatorio',
              pattern:  { value: /^\S+@\S+$/i, message: 'Formato inválido' }
            })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="mt-1 text-red-600">{errors.email.message}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Teléfono</label>
          <input
            {...register('phoneNumber', { required: 'El teléfono es obligatorio' })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && <p className="mt-1 text-red-600">{errors.phoneNumber.message}</p>}
        </div>

        {/* Rol */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Rol</label>
          <select
            {...register('role', { required: 'El rol es obligatorio' })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un rol</option>
            <option value="Usuario">Usuario</option>
            <option value="Administrador">Administrador</option>
          </select>
          {errors.role && <p className="mt-1 text-red-600">{errors.role.message}</p>}
        </div>

        {/* Estado */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('status')}
            id="status"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="status" className="font-medium text-gray-700">Activo</label>
        </div>

        {/* Foto de perfil */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">URL Foto de perfil</label>
          <input
            type="url"
            {...register('profilePicture', { required: 'La URL es obligatoria' })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.profilePicture && <p className="mt-1 text-red-600">{errors.profilePicture.message}</p>}
        </div>

        {/* Dirección */}
        <div className="border-t pt-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Dirección</h2>
          {/* Calle */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Calle</label>
            <input
              {...register('address.calle', { required: 'La calle es obligatoria' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.address?.calle && <p className="mt-1 text-red-600">{errors.address.calle.message}</p>}
          </div>
          {/* Número */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Número</label>
            <input
              type="number"
              {...register('address.numero', { valueAsNumber: true, required: 'El número es obligatorio' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.address?.numero && <p className="mt-1 text-red-600">{errors.address.numero.message}</p>}
          </div>
          {/* Ciudad */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Ciudad</label>
            <input
              {...register('address.ciudad', { required: 'La ciudad es obligatoria' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.address?.ciudad && <p className="mt-1 text-red-600">{errors.address.ciudad.message}</p>}
          </div>
          {/* Código Postal */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Código Postal</label>
            <input
              {...register('address.codigoPostal', { required: 'El código postal es obligatorio' })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.address?.codigoPostal && <p className="mt-1 text-red-600">{errors.address.codigoPostal.message}</p>}
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
        >
          {isSubmitting ? 'Actualizando...' : 'Actualizar usuario'}
        </button>
      </form>
    </div>
  );
}
