import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}


    getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDTO);
    }

    async getTaskById(id: number): Promise<Task> {
        const taskFounded = await this.taskRepository.findOne(id);

        if(!taskFounded) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }

        return taskFounded;
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDTO);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if(result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();

        return task;
    }
    // updateTaskStatus(id: string, status: TaskStatus) {
    //     const task = this.getTaskById(id);

    //     if(task) task.status = status;

    //     return task;
    // }
}
