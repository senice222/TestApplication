import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRouter from './routes/UserRoutes'
import testRouter from './routes/TestRoutes'
import coursesRouter from './routes/CourseRoutes'
import ProfileRouter from './routes/ProfileRoutes'

mongoose.connect
(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ekemlv8.mongodb.net/?retryWrites=true&w=majority`,)
    .then(() => console.log('DB ok'))
    .catch((e) => console.log('DB err', e))

const router = express()

router.use(express.json())
router.use(cors())

router.listen(4000, () => {
    console.log('Server OK')
})

// routes

router.use('/auth', authRouter)
router.use('/tests', testRouter)
router.use('/courses', coursesRouter)
router.use('/profile', ProfileRouter)


