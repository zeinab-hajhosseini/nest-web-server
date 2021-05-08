import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){};

    @ApiOkResponse({type: User, isArray: true})
    @Get()
    getUsers():User[]{
        return this.userService.findAll();
    }

    @ApiOkResponse({type: User})
    @Get(':id')
    getUserById(@Param('id') id: string):User{
        return this.userService.findById(Number(id));
    }

    @ApiCreatedResponse({type: User})
    @Post()
    createUser(@Body() body: CreateUserDto):User{
        return this.userService.createUser(body); 
    }

}
