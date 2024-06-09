import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../auth/schema/user.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schema/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(
    createTaskDto: CreateTaskDto,
    user: UserDocument,
  ): Promise<Task> {
    const data = Object.assign(createTaskDto, { user: user._id });
    return this.taskModel.create(data);
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).populate('user');
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const result = this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    return result;
  }

  async remove(id: string) {
    try {
      const result = await this.taskModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('id not found');
      }
      return { message: 'Delete successful' };
    } catch (error) {
      throw error;
    }
  }
}
