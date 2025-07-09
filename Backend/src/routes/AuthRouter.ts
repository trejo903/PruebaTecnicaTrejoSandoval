import {Router} from 'express'
import rateLimit from 'express-rate-limit'
import AuthController from '../controllers/AuthController'
import { handleInputErrors, loginValidationRules, registerValidationRules } from '../middleware/validation'


const router = Router()

const authLimiter = rateLimit({
    windowMs:15*60*1000,
    max:5,
    message:{
        msg:'Has excedido el numero de intentos. Vuelve mas tarde'
    }
})


router.post('/create-account',
    authLimiter,
    registerValidationRules,
    handleInputErrors,
    AuthController.createAuth
)

router.post('/login',
    authLimiter,
    loginValidationRules,
    handleInputErrors,
    AuthController.login
)


export default router