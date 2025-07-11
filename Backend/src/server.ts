import express from 'express'
import morgan from 'morgan'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db'
import routerCrud from './routes/PruebaTecnicaRouter'
import routerLogin from './routes/AuthRouter'

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync({alter:true})
        console.log(colors.yellow.bold('Conexion exitosa a la base de datos'))
    } catch (error) {
        console.log(colors.red.bold('Fallo la conexion a la base de datos'))
    }
}

connectDB()

const app = express()

app.use(morgan('dev'))

app.use(cors({
    origin:'https://prueba-tecnica-trejo-sandoval.vercel.app',
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/pruebatecnica',routerCrud)
app.use('/api/auth',routerLogin)

export default app