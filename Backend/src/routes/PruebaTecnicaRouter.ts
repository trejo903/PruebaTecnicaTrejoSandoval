import { Router } from "express";
import { PruebaTecnicaController } from "../controllers/PruebaTecnicaController";
import { param } from "express-validator";
import { handleInputErrors, userValidationRules } from "../middleware/validation";
import { authenticateJWT } from "../utils/auth";


const router = Router()

router.use('/users',authenticateJWT)

router.get('/users',
    PruebaTecnicaController.getUsers
)

router.post('/users',
    userValidationRules(),
    handleInputErrors,
    PruebaTecnicaController.createUser
)

router.put('/users/:id',
    param('id').isInt().withMessage('Id de usuario invalido'),
    userValidationRules(),
    handleInputErrors,
    PruebaTecnicaController.updateUser
)

router.delete('/users/:id',
    param('id').isInt().withMessage('Id de usuario invalido'),
    handleInputErrors,
    PruebaTecnicaController.deleteUser
)
export default router