import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Delete } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUsers(@Query('name') name?: string): Promise<User[]> {
    return this.userService.findAll(name);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = this.userService.findById(id);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'This user is not found',
        },
        HttpStatus.NOT_FOUND,
      );
      //throw new NotFoundException();
    }

    return user;
  }

  @ApiCreatedResponse({ type: User, description: 'Create Successfully' })
  @ApiBadRequestResponse({ description: 'Request DTO Not validate' })
  @Post()
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Patch()
  updateUser(@Body() body: UpdateUserDto): Promise<User> {
    const updatedUser = this.userService.updateUser(body);
    
    if(!updatedUser) throw new NotFoundException();

    return updatedUser;

  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const deletedUser = this.userService.deleteUser(id);
    if (!deletedUser) throw new NotFoundException();

    return deletedUser;
  }
}
