import mongoose, {Schema, Document} from 'mongoose';
import { ITest } from '../types/TestModelTypes';

export interface ITestModal extends ITest, Document {}

const TestSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        questions: {
            type: Array,
            required: true,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        userMarks: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<ITestModal>('Test', TestSchema);
