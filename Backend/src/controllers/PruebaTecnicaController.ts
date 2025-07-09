import type {Request,Response} from 'express'
import Usuario from '../models/Usuario'
import Address from '../models/Address';
import { Op } from 'sequelize';

export class PruebaTecnicaController{
    static getUsers=async(req:Request,res:Response)=>{
        try {
            const page = Math.max(1,parseInt(req.query.page as string) || 1)
            const limit = Math.max(1,parseInt(req.query.limit as string) || 10)
            const role = req.query.role as string | undefined
            const statusQ = req.query.status as string | undefined
            const search = req.query.search as string | undefined
            const offset = (page - 1) * limit
            const where:any ={}
            if(role) where.role = role;
            if(statusQ !== undefined){
                where.status = statusQ === 'true'
            }
            if(search){
                where[Op.or]=[
                    {firstName:{[Op.like]:`%${search}`}},
                    {lastName:{[Op.like]:`%${search}`}},
                    {email:{[Op.like]:`%${search}`}},
                ]
            }
            const{count,rows} = await Usuario.findAndCountAll({
                where,
                include:[Address],
                limit,
                offset,
                order:[['id','ASC']]
            })

            res.json({
                data:rows,
                meta:{
                    totalItems:count,
                    totalPages:Math.ceil(count/limit),
                    currentPage:page,
                    perPage:limit
                }
            })
            return
        } catch (error) {
            res.status(500).json({msg:'Error al obtener los usuarios'})
            return
        }
    }



    static createUser=async(req:Request,res:Response)=>{
        const t = await Usuario.sequelize!.transaction();
        try {
            const {firstName,lastName,email,phoneNumber,role,status,profilePicture,address:addressData} = req.body
            const newAddress = await Address.create(addressData,{transaction:t})
            const newUser = await Usuario.create(
                {firstName,lastName,email,phoneNumber,role,status,profilePicture,addressId:newAddress.id},
                {transaction:t}
            )
            await t.commit()
            res.status(201).json({msg:'Usuario añadido correctamente'})
            return
        } catch (error) {
            await t.rollback()
            res.status(400).json({
                msg:'Error creando usuario',
                error:error.message
            })
            return
        }
    }
    static deleteUser=async(req:Request,res:Response)=>{
        const t = await Usuario.sequelize!.transaction();
        try {
            const {id}=req.params
            const user = await Usuario.findByPk(id,{
                include:[Address],
                transaction:t
            })
            if(!user){
                await t.rollback()
                res.status(404).json({msg:'Usuario no encontrado'})
                return
            }

            const address = user.address;

            await user.destroy({transaction:t})
            
            if(address){
                await address.destroy({transaction:t})
            }
            await t.commit();
            res.json({msg:'Usuario y direccion eliminados correctamente'})
            return
        } catch (error) {
            await t.rollback();
            res.status(500).json({
                msg:'Error al eliminar usuario',
                error:error.message
            })
        }
    }
    static updateUser = async(req:Request,res:Response)=>{
        const t = await Usuario.sequelize!.transaction()
        try {
            const{id}=req.params
            const {firstName,lastName,email,phoneNumber,role,status,profilePicture,address:addressData} = req.body
            const user  = await Usuario.findByPk(id,{
                include:[Address],
                transaction:t
            })
            if(!user){
                await t.rollback()
                res.status(404).json({msg:'Usuario no encontrado'})
                return
            }

            const duplicate = await Usuario.findOne({where:{email},transaction:t})
            if(duplicate && duplicate.id !== user.id){
                await t.rollback()
                res.status(400).json({msg:'El correo ya esta en uso'})
                return
            }


            if(addressData && user.address){
                await user.address.update(addressData,{transaction:t})
            }
            await user.update(
                {firstName,lastName,email,phoneNumber,role,status,profilePicture},
                {transaction:t}
            )

            await t.commit()

            res.json({msg:'Usuario actualizado correctamente'})
            return
        } catch (error) {
            await t.rollback()
            res.status(500).json({
                msg:'Error al actualizar usuario',
                error:error.message
            })
            return
        }
    }
}