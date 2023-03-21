import CourseSchema from "../Models/CourseModel";
import UserModel from "../Models/UserModel";
import { Request, Response } from "express"
import { Error, Document } from "mongoose";
import { IRequestWithUserId } from "../utils/checkAuth";


export const createCourse = async (req: Request, res: Response) => {
    try {
        
        const doc = new CourseSchema({
            title: req.body.title,
            description: req.body.description,
            text: req.body.text,
            ownerId: (req as IRequestWithUserId).userId,
        }) 
        const course = await doc.save()

        res.json(course)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось создать курс'
        })
    }
}
export const removeCourse = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        
        CourseSchema.findByIdAndDelete(id, (err: Error, doc: Document) => {
            if (err) {
                return res.status(500).json({
                    message: 'Неудалось удалить курс'
                })
            }
            if (!doc) {
                return res.status(500).json({
                    message: 'Такого курса не сущевствует'
                })
            }
            res.json({success: true})
        })

        const doc = await UserModel.findByIdAndUpdate((req as IRequestWithUserId).userId, {
            $pull: { createdArticles: { articleId: id } }
        })
        doc?.save()

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не удалось удалить курс"
        })
    }
}

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses = await CourseSchema.find().exec()
        res.json(courses)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось получить курсы'
        })
    }
}

