import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users') // these will handle the /users route
export class UsersController {
  //   here we will add the routes for the users
  //   get /users
  //   get /users/:id
  //   post /users
  // patch /users/:id
  // delete /users/:id

  @Get() // this will handle the get /users route to get all users
  findAll() {
    return []; // return all users
  }

  @Get(':id') // this will handle the get /users/:id route to get a single user
  findOne(@Param('id') id: string) {
    return { id }; // return a single user
  }

  // also remember that order of the routes matters if we have same method request
  // for example if we have a route get /users/interns and get /users/:id
  // the get /users/interns should be placed before get /users/:id

  @Get('interns') // this will handle the get /users/interns route to get all interns
  findAllInterns() {
    return []; // return all interns
  }

  @Post() // this will handle the post /users route to create a new user
  create(@Body() user: {}) {
    return user; // return a message that user has been created
  }
}
