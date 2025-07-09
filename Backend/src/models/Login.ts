import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table({tableName:'Logins'})

class Login extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({type:DataType.INTEGER,allowNull:false})
    declare id:number

    @Unique
    @Column({
        type:DataType.STRING(100),
        allowNull:false,
        validate:{
            notEmpty:{msg:'El email es obligatorio'},
            isEmail:{msg:'Formato de correo invalido'},
            isLowercase:{msg:'El email debe ir todo en minusculas'}            
        }
    })
    declare email:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:'La contraseña no puede estar vacia'},
            len:{args:[6,100],msg:'La contraseña debe tener almenos 6 caracteres'}
        }
    })

    declare password:string

}


export default Login