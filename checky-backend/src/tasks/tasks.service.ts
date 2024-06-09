import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schema/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.TaskModel.create(createTaskDto);
  }

  async findAll(): Promise<Task[]> {
    return this.TaskModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
