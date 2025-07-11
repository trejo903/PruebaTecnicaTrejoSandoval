import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table, Unique, Validate } from "sequelize-typescript";
import Address from "./Address";

export type Role = 'Administrador' | 'Usuario';

@Table({
    tableName:'Usuarios'
})


class Usuario extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    declare id:number
    @Column({
        type:DataType.STRING(30),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'El nombre no puede estar vacio'
            },
            len:{
                args:[2,30],
                msg:'El nombre debe tener entre 2 y 30 caracteres'
            }
        }
    })
    declare firstName:string

    @Column({
        type:DataType.STRING(30),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'El nombre no puede estar vacio'
            },
            len:{
                args:[2,30],
                msg:'El nombre debe tener entre 2 y 30 caracteres'
            }
        }
    })
    declare lastName:string
    @Unique
    @Column({
        type:DataType.STRING(100),
        allowNull:false,
        validate:{
            notEmpty:{msg:'El email es obligatorio'},
            isEmail:{msg:'Formato de correo invalido'},
            len:{args:[5,100],msg:'Debe tener entre 5 y 100 caracteres'},
            isLowercase:{msg:'El email debe ir todo en minusculas'}
        }
    })
    declare email:string
    @Column({
        type:DataType.STRING(20),
        allowNull:false,
        validate:{
            notEmpty:{msg:'El telefono es obligatorio'},
            isNumeric:{msg:'Solo debe contener digitos'},
            len:{args:[7,20],msg:'Debe tener entre 7 y 20 digitos'}
        }
    })
    declare phoneNumber:number

    @Column({
        type:DataType.STRING(20),
        allowNull:false,
        defaultValue:'Usuario'
    })
    declare role:String
    @AllowNull(false)
    @Default(false)
    @Column({
        type:DataType.BOOLEAN
    })
    declare status:boolean

    @ForeignKey(()=>Address)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        field:'addressId'
    })
    declare addressId:number

    @BelongsTo(()=>Address,'addressId')
    declare address:Address


    @Column({
        type:DataType.STRING(500),
        allowNull:false,
        defaultValue: 'https://res.cloudinary.com/dgpd2ljyh/image/upload/v1748920792/default_nlbjlp.jpg',
        validate:{
            notEmpty:{
                msg:'La url de la imagen de perfil no puede ir vacia'
            },
            isUrl:{
                msg:'El valor debe ser una URL valida'
            }
        }
    })
    declare profilePicture:string
}

export default Usuario