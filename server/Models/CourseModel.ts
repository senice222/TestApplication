import mongoose, {Schema} from 'mongoose';
import { ICourse } from '../types/CourseModelTypes';

export interface ICourseModal extends ICourse, Document {}

const CourseSchema: Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
    },
    {
        timestamps: true
    },
);

export default mongoose.model<ICourse>('Course', CourseSchema);
