import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTaskWithFilter } from './dto/get-tasks-filter.dto';


@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: getTaskWithFilter): Task[] {
        //if we have any filter defined, call taskService.gettaskwithfilter
        if(Object.keys(filterDto).length) {
            return this.taskService.getTaskWithFilter(filterDto);
        }else {
             //otherwise, get all tasks
            return this.taskService.getAllTasks();
        }
       
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string): void {
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(@Param('id') id: string,@Body('status') status: TaskStatus): Task {
        return this.taskService.updateTask(id,status);
    }
}
