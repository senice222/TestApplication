import * as CourseController from '../controllers/CourseController'
import {Router} from 'express'
import checkAuth  from '../utils/checkAuth'

const coursesRouter = Router()

coursesRouter.post('/create', checkAuth, CourseController.createCourse)
coursesRouter.delete('/:id', checkAuth, CourseController.removeCourse)
coursesRouter.get('', CourseController.getAllCourses)

export default coursesRouter