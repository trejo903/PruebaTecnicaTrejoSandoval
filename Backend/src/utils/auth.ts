import type{Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request{
    userId:string
}

export const authenticateJWT=(req:AuthRequest,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization
    if(!authHeader?.startsWith('Bearer ')){
        res.status(401).json({msg:'Token no proporcionado'})
        return
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token,'PruebaTecnica') as {id:string}
        req.userId = payload.id
        next();
    } catch (error) {
        res.status(401).json({msg:'Token invalido o expirado'})
        return
    }
}