import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
dotenv.config()

const connectionString = process.env.DATABASE_URL!
export const db = new Sequelize(connectionString, {
  models: [__dirname + '/../models/**/*'],
  logging: false,
  dialectOptions: {
    ssl: {
      require: false
    }
  }
})
