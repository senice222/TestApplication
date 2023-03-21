import * as TestController from '../controllers/TestController'
import {Router} from 'express'
import checkAuth from '../utils/checkAuth'

const testRouter = Router()

testRouter.post('/create', checkAuth, TestController.createTest)
testRouter.get('', TestController.getAll)
testRouter.delete('/:id', checkAuth, TestController.deleteTest)
testRouter.post('/setMark/:id', checkAuth, TestController.setUserMark)

export default testRouter