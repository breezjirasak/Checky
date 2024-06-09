import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';
import { User } from '../../auth/schema/user.schema';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    readonly startDate?: Date;

    readonly endDate?: Date;
    
    readonly task?: string;
    readonly status?: boolean;

    @IsEmpty({ message: "You can not pass user id" })
    readonly user:User
}
