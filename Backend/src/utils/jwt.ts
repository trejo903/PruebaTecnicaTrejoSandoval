import jwt from 'jsonwebtoken'


export const generateJWT=(id:string)=>{
    const token = jwt.sign({id},"PruebaTecnica",{
        expiresIn:'30d'
    })
    return token
}