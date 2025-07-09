import { Router } from "express";
import { PruebaTecnicaController } from "../controllers/PruebaTecnicaController";
import { param } from "express-validator";
import { handleInputErrors, userValidationRules } from "../middleware/validation";


const router = Router()


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