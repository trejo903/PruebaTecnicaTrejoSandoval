import express from 'express'
import morgan from 'morgan'
import colors from 'colors'
import { db } from './config/db'

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

app.use(express.json())

export default app