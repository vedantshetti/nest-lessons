import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
// ParseIntPipe is a pipe that will parse the parameter to an integer
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UsersService } from './users.service';

@Controller('users') // these will handle the /users route
export class UsersController {
  //   here we will add the routes for the users
  //   get /users
  //   get /users/:id
  //   post /users
  // patch /users/:id
  // delete /users/:id

  constructor(private readonly usersService: UsersService) {}

  @Get() // this will handle the get /users route to get all users
  findAll(@Query('role') role?: 'INTERN' | 'EMPLOYEES' | 'ADMIN') {
    return this.usersService.findAll(role); // return all users
  }

  @Get(':id') // this will handle the get /users/:id route to get a single user
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id); // return a single user
  }

  // also remember that order of the routes matters if we have same method request
  // for example if we have a route get /users/interns and get /users/:id
  // the get /users/interns should be placed before get /users/:id

  @Get('interns') // this will handle the get /users/interns route to get all interns
  findAllInterns() {
    return []; // return all interns
  }

  @Post() // this will handle the post /users route to create a new user
  create(
    @Body(ValidationPipe)
    createuserdto: CreateUserDto,
  ) {
    return this.usersService.create(createuserdto); // return a message that user has been created
  }

  @Patch(':id') // this will handle the patch /users/:id route to update a user
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateuserdto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateuserdto); // return a single user
  }

  @Delete(':id') // this will handle the delete /users/:id route to delete a user
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id); // return a single user
  }
}
