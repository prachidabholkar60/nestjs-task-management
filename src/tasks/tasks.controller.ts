import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')

@UseGuards(AuthGuard())
export class TasksController {

    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto,
    @GetUser()  user: User,
    ): Promise<Task[]> {

        return this.tasksService.getTasks(filterDto, user);
       
    } 

    @Get('/:id')
    getTaskById( @Param('id', ParseIntPipe) id: number,
   @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.getTaskById(id, user);

    }
    
    @Delete('/:id')
    deleteTask( 
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
        ): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }



    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
    ): Promise<Task>{
         return this.tasksService.createTask(createTaskDto, user);

    }

    @Patch('/:id/status')
    updateTaskStatus( 
        @Param('id', ParseIntPipe) id:number,
        @Body('status') status: TaskStatus,
        @GetUser() User: User,

        ): Promise<Task> {
            return this.tasksService.updateTaskStatus(id, status, User);

    }

}
