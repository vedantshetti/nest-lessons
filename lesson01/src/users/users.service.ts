import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'DEVELOPER',
    },
    {
      id: 3,
      name: 'Catherine Brown',
      email: 'catherine.brown@example.com',
      role: 'MANAGER',
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      role: 'DESIGNER',
    },
    {
      id: 5,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'EMPLOYEES' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users; // if no role is provided, return all users
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = this.users.sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserdto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUserdto,
        };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removeduser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeduser;
  }
}
