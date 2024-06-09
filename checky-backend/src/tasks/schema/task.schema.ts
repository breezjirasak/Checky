import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../auth/schema/user.schema';

export type TaskDocument = Task & Document;


@Schema({timestamps: true})
export class Task {
    @Prop({required: false})
    startDate: Date;

    @Prop({required: false})
    endDate: Date;

    @Prop({required: true})
    task: string;

    @Prop({required: true})
    status: boolean;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User
}

export const TaskSchema = SchemaFactory.createForClass(Task);