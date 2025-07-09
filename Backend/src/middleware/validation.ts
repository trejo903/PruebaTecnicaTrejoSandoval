import {body, ValidationChain, validationResult} from 'express-validator'
import {Request,Response,NextFunction} from 'express'

export const handleInputErrors=(req:Request,res:Response,next:NextFunction)=>{
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
        return
    }
    next()
}

export const userValidationRules=():ValidationChain[]=>[
    body('firstName')
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .isLength({min:2,max:30}).withMessage('El nombre debe tener entre 2 y 30 caracteres'),
    body('lastName')
        .notEmpty().withMessage('El apellido no puede estar vacio')
        .isLength({min:2,max:30}).withMessage('El apellido debe tener entre 2 y 30 caracteres'),
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Formato de correo invalido')
        .isLowercase().withMessage('El email debe ir en minusculas'),
    body('phoneNumber')
        .notEmpty().withMessage('El telefono es obligatorio')
        .isNumeric().withMessage('Solo debe contener digitos')
        .isLength({min:7,max:20}).withMessage('Debe tener entre 7 y 20 digitos'),
    body('address.calle')
        .notEmpty().withMessage('La calle no puede estar vacia')
        .isLength({min:3,max:100}).withMessage('La calle debe tener entre 3 y 100 caracteres'),
    body('address.numero')
        .notEmpty().withMessage('El numero es obligatorio')
        .isInt({min:1}).withMessage('El numero debe ser un entero mayor que 0'),
    body('address.ciudad')
        .notEmpty().withMessage('La ciudad no puede estar vacia'),
    body('address.codigoPostal')
        .notEmpty().withMessage('El codigo postal no puede estar vacio')
        .isPostalCode('MX').withMessage('Codigo postal invalido para Mexico')
]



export const registerValidationRules=[
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Formato de correo invalido')
        .isLowercase().withMessage('El email debe de ir en minusculas'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirmPassword')
        .notEmpty().withMessage('Debes confirmar la contraseña')
        .custom((value,{req})=>{
            if(value !== req.body.password){
                throw new Error('Las contraseñas no coinciden')
            }
            return true;
        })
]

export const loginValidationRules=[
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Formato de correo invalido')
        .isLowercase().withMessage('El email debe de ir en minusculas'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres')
]