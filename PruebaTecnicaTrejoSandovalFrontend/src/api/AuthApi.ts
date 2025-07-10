import { isAxiosError } from "axios";
import api from "../lib/axios";
import type { CreateAccountForm, LoginForm } from "../types";



export async function createAccount(formData:CreateAccountForm) {
    try {
        const url = "/auth/create-account"
        const {data}= await api.post<string>(url,formData)
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            const serverMsg = typeof error.response.data==='string'?error.response.data:'Error al crear la cuenta'
            throw new Error(serverMsg)
        }
    }
}

export async function login(formData:LoginForm) {
    try {
        const url = "/auth/login"
        const {data}= await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
             const serverMsg = typeof error.response.data==='string'?error.response.data:'Error al crear la cuenta'
            throw new Error(serverMsg)
        }
    }
}