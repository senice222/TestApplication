import * as UserController from '../controllers/UserController'
import {Router} from 'express'
import checkAuth from '../utils/checkAuth'
import {registerValidation, loginValidation} from '../Validation'

const profileRouter = Router()

profileRouter.post('/setMarks', checkAuth, UserController.setUserProfileMarks)
profileRouter.post('/setCreatedTests', checkAuth, UserController.setUserCreatedTests)
profileRouter.post('/setCreatedArticles', checkAuth, UserController.setUserCreatedArticles)

export default profileRouter