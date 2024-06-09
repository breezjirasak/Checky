import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;


@Schema({timestamps: true})
export class Task {
    @Prop({required: true})
    dateTime: Date;

    @Prop({required: true})
    task: string;

    @Prop({required: true})
    status: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);