import { UpdateTaskDto } from './../dto/update-task.dto';
import { UpdateCarDto } from './../../cars/dto/update-car.dto';
import { CreateTaskDto } from './../dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from '../entities/task.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Project } from '../entities/project.entity';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ){}
    async create(createTaskDto:CreateTaskDto){
        const task = new Task(createTaskDto)

        task.user= await this.userRepository.findOne({
            where: { 
                id:createTaskDto.userId
            }
        })
        task.project= await this.projectRepository.findOne({
            where: { 
                id:createTaskDto.projectId
            }
        })
        await this.tasksRepository.save({...task, status:TaskStatus.create})
        return "Task created successfully"
    }
    async findAll(filters: GetTasksFilterDto){
        let where: FindOptionsWhere<Task> = {};
        if(filters.userId) {
            where = {...where, user: { id: filters.userId }};
        }

        if(filters.projectId) {
            where = {...where, project: { id: filters.projectId }};
        }

        return this.tasksRepository.find({
            relations:{
                user: true,
                project: true
            },
            order: {
                title: 'ASC'
            },
            where,
        });
    }
    async update(id: string, UpdateTaskDto: UpdateTaskDto) {
        const task = new Task(UpdateTaskDto);
        await this.tasksRepository.save({id, ...task});
        return 'Задача обновлена'
    }
    async remove(id: string) {
        await this.tasksRepository.delete({ id });
        return 'Задача удалена'
    }
}