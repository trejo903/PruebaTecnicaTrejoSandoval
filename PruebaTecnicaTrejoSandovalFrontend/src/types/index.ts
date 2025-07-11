export interface LoginForm {
  email: string
  password: string
}

export interface CreateAccountForm {
  email: string
  password: string
  confirmPassword: string
}


export interface Address {
  calle: string
  numero: number
  ciudad: string
  codigoPostal: string
}

export interface CreateUserForm {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  role: string
  status: boolean
  profilePicture: string
  address: Address
}


export interface User {
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


export interface Meta {
  totalItems: number
  totalPages: number
  currentPage: number
  perPage: number
}

