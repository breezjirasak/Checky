import { IsNotEmpty, IsString, IsBoolean, IsDate, IsEmpty } from 'class-validator';
import { User } from '../../auth/schema/user.schema';

export class CreateTaskDto {
  @IsDate()
  readonly startDate: Date;
  @IsDate()
  readonly endDate: Date;
  @IsNotEmpty()
  @IsString()
  readonly task: string;
  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;

  @IsEmpty({ message: "You can not pass user id" })
  readonly user:User
}
