import {Sequelize} from 'sequelize-typescript'

export const db = new Sequelize("postgresql://neondb_owner:npg_gcfQTuh3z6ar@ep-empty-king-aeamx66y-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",{
    models:[__dirname+"/../models/**/*"],
    logging:false,
    dialectOptions:{
        ssl:{
            require:false
        }
    }
})