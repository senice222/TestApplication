import mongoose from 'mongoose'

export interface ICourse {
    title: string,
    description: string,
    text: string,
    ownerId: mongoose.Schema.Types.ObjectId
}