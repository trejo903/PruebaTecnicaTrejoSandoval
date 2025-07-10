import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import type { LoginForm } from '../../types'
import { toast } from 'react-toastify'
import { login } from '../../api/AuthApi'


export default function LoginView() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    try {
      const mensaje = await login(data)
      localStorage.setItem('TOKEN',mensaje!)
      navigate('/')
      } catch (error:any) {
        toast.error(error?.message)
      }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 space-y-6"
    >
      {/* Email */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          {...register('email', {
            required: 'El email es obligatorio',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Formato de email inválido'
            }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email?.message && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Contraseña */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'Mínimo 6 caracteres'
            }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password?.message && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Botón de submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white 
                   font-semibold rounded-lg transition duration-200"
      >
        {isSubmitting ? 'Enviando...' : 'Iniciar sesión'}
      </button>

      {/* Enlace a registro */}
      <p className="text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
        <Link
          to="/auth/register"
          className="font-semibold text-blue-600 hover:text-blue-800"
        >
          Regístrate
        </Link>
      </p>
    </form>
  )
}
