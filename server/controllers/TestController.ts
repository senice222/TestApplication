import TestSchema from '../Models/TestModel'
import UserModel from '../Models/UserModel'
import { Request, Response } from "express"
import { Error, Document } from "mongoose";
import { IRequestWithUserId } from '../utils/checkAuth';

export const createTest = async (req: Request, res: Response) => {
    try {
        const doc = new TestSchema({
            name: req.body.name,
            questions: req.body.questions,
            ownerId: (req as IRequestWithUserId).userId
        })

        const test = await doc.save()

        res.json(test)

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось создать тест',
        });
    }
}

export const deleteTest = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        TestSchema.findByIdAndDelete(id, (err: Error, doc: Document) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось удалить тест',
                });
            }
            if (!doc) {
                return res.status(500).json({
                    message: 'Тест не найден',
                });
            }
            res.json({success: true})
        })

        const doc = await UserModel.findByIdAndUpdate((req as IRequestWithUserId).userId, {
            $pull: { createdTests: { testId: id } }
        })
        doc?.save()
        
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не удалось удалить тест"
        })
    }
}
// 

export const getAll = async (req: Request, res: Response) => {
    try {
        const tests = await TestSchema.find().exec()
        res.json(tests)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
}


export const setUserMark = async (req: Request, res: Response) => {
    try {
        const idTest = req.params.id
        
        const updateSchema = await TestSchema.findByIdAndUpdate(idTest, {
            $push: {userMarks: { id: req.body.id, name: req.body.username, mark: req.body.mark}}
        })

        const doc = await updateSchema?.save()
    
        res.json(doc)
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось пройти тест'
        })
    }
}
