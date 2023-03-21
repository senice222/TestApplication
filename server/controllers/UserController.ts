import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../Models/UserModel'
import {validationResult} from 'express-validator'
import { Request, Response } from "express"
import { IRequestWithUserId } from "../utils/checkAuth";


export const register = async (req: Request, res: Response) => {
    const isErrors = validationResult(req)

    if (!isErrors.isEmpty()) {
        return res.status(400).json(isErrors.array())
    }
    const password = req.body.password

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const doc = new UserModel({
        fullName: req.body.fullName,
        email: req.body.email,
        passwordHash: hashed,
        avatarUrl: req.body.avatarUrl
    })

    const user = await doc.save()

    const token = jwt.sign(
        {
            _id: user._id
        },
        'secret123',
        {
            expiresIn: '30d'
        }
    )

    const {passwordHash, ...userData} = user._doc

    res.json({
        ...userData,
        token
    })
}
export const login = async (req: Request, res: Response) => {
    const isErrors = validationResult(req)

    if (!isErrors.isEmpty()) {
        return res.status(400).json(isErrors.array())
    }
    const user = await UserModel.findOne({email: req.body.email})

    if (!user) {
        return res.status(404).json({
            message: 'Пользователь не найден'
        })
    }

    const password = req.body.password

    const isValidPass = await bcrypt.compare(password, user._doc.passwordHash)

    if (!isValidPass) {
        return res.status(404).json({
            message: 'Неверный логин или пароль'
        })
    }

    const token = jwt.sign(
        {
            _id: user._id
        },
        'secret123',
        {
            expiresIn: '30d'
        }
    )
    const {passwordHash, ...userData} = user._doc

    res.json({
        ...userData,
        token
    })
}

export const getMe = async (req: Request, res: Response) => {
    const user = await UserModel.findById((req as IRequestWithUserId).userId)
    if (!user) {
        return res.status(404).json({
            message: 'Пользователь не найден',
        })
    }

    const {passwordHash, ...userData} = user._doc

    res.json(userData)
}

export const setUserProfileMarks = async (req: Request, res: Response) => {
    try {
        const updateUser = await UserModel.findByIdAndUpdate((req as IRequestWithUserId).userId, {
            $push: {marks: {id: req.body.id, testName: req.body.testName, mark: req.body.mark, maxMark: req.body.maxMark}}
        })
        const doc = await updateUser?.save()
    
        res.json(doc)
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось записать оценку'
        })
    }
}
export const getUserMarks = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById((req as IRequestWithUserId).userId)
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            })
        }
        
        res.json({marks: user.marks, created: user.createdTests, createdArticles: user.createdArticles
        })
    } catch(e) {
        console.log(e)
    }
}
export const setUserCreatedTests = async (req : Request, res : Response) => {
    try {        
        const updateUserCreated = await UserModel.findByIdAndUpdate((req as IRequestWithUserId).userId, {
            $push: {createdTests: {testId: req.body.testId, name: req.body.name, questionsLength: req.body.questionsLength}}
        })

        const doc = await updateUserCreated?.save()

        res.json(doc)

    } catch(e) {
        console.log(e)
    }
}
export const setUserCreatedArticles = async (req: Request, res: Response) => {
    try {        
        const updateUserCreated = await UserModel.findByIdAndUpdate((req as IRequestWithUserId).userId, {
            $push: {createdArticles: {articleId: req.body.articleId, name: req.body.name}}
        })

        const doc = await updateUserCreated?.save()

        res.json(doc)

    } catch(e) {
        console.log(e)
    }
}
