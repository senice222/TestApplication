import * as UserController from '../controllers/UserController'
import {Router} from 'express'
import checkAuth from '../utils/checkAuth'
import {registerValidation, loginValidation} from '../Validation'

const authRouter = Router()

authRouter.post('/register', registerValidation, UserController.register)
authRouter.post('/login', loginValidation, UserController.login)
authRouter.get('/getMe', checkAuth, UserController.getMe)
authRouter.get('/getUserMarks', checkAuth, UserController.getUserMarks)

export default authRouter