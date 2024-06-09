import {IsEmpty, IsString, IsBoolean, IsDate} from 'class-validator'

export class CreateTaskDto {
    readonly dateTime: Date;
    readonly task: string;
    readonly status: boolean;

}
