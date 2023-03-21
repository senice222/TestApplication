import mongoose, {Document} from 'mongoose';
import { IUser } from '../types/UserModelTypes';

export interface IUserModal extends IUser, Document {
    _doc: IUser
}

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        marks: Array,
        createdTests: Array,
        createdArticles: Array,
        // avatarUrl: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<IUserModal>('User', UserSchema);
