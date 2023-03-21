import mongoose from 'mongoose'

interface IAnswer {
    title: string, 
    answerId: string
}
interface IQuestion {
    title: string,
    answers: IAnswer[],
    correct: number,
    id: string
}

interface IUserMarks {
    id: string,
    name: string,
    mark: number
}

export interface ITest {

    name: string,
    questions: IQuestion[],
    ownerId: mongoose.Schema.Types.ObjectId,
    userMarks: IUserMarks[]
}