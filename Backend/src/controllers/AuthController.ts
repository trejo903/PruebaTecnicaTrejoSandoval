import type {Request,Response} from 'express'
import bcrypt from 'bcrypt'
import Login from '../models/Login'
import { generateJWT } from '../utils/jwt'

export default class AuthController{
    static createAuth=async(req:Request,res:Response)=>{
        const {email,password} = req.body
        if(!email || !password){
            res.status(400).send('Email y contraseña son obligatorios')
            return
        }
        const exists = await Login.findOne({where:{email}})
        if(exists){
            res.status(400).send('El email ya esta registrado')
            return
        }
        try {
            const hasedPassword = await bcrypt.hash(password,10);
            const newLogin = await Login.create({
                email,
                password:hasedPassword
            })
            res.status(201).send('Registro de login creado correctamente')
            return
        } catch (error) {
            res.status(500).send('Error al crear usuario')
        }
    }
    static login =async(req:Request,res:Response)=>{
        const{email,password}=req.body
        if(!email || !password){
            res.status(400).send('Email y contraseña son obligatorios')
            return
        }
        try {
            const login = await Login.findOne({where:{email}})
            if(!login){
                res.status(401).send('Correo no encontrado')
                return
            }
            const isMatch = await bcrypt.compare(password,login.password)
            if(!isMatch){
                res.status(401).send('Contraseña incorrecta')
                return
            }
            const token = generateJWT(login.id.toString())
            res.send(token)
            return
        } catch (error) {
            res.status(500).send('Error al iniciar sesion')
            return
        }
    }
}

