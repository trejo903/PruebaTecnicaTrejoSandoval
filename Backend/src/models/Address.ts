import { AutoIncrement, Column, DataType, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import Usuario from "./Usuario";

@Table({
    tableName:'Address'
})

class Address extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    declare id:number
    @Column({
        type:DataType.STRING(100),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'La calle no puede estar vacia'
            },
            len:{
                args:[3,100],
                msg:'La calle debe tener entre 3 y 100 caracteres'
            }
        }
    })
    declare calle:string
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        validate:{
            isInt:{
                msg:'El numero debe ser un entero'
            }
        }
    })
    declare numero:number
    @Column({
        type:DataType.STRING(100),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'La ciudad no puede estar vacia'
            }
        }
    })
    declare ciudad:string
    @Column({
        type:DataType.STRING(5),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'El codigo postal no puede estar vacio'
            },
            isNumeric:{
                msg:'El codigo postal debe contener solo digitos'
            },
            len:{
                args:[5,5],
                msg:'El codigo postal debe tener exactamente 5 digitos'
            },
            isPostalCode:{
                args:['MX'],
                msg:'El codigo postal no es valido para Mexico'
            }
        }
    })
    declare codigoPostal:string


    @HasOne(()=>Usuario,'addressId')
    usuario?:Usuario
}

export default Address