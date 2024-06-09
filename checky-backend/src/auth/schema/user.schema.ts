import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
    @Prop({
        unique: [true, "Username already exist"],
        required: [true, "Username is required"],
    })
    username: string;

    @Prop({required: true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);