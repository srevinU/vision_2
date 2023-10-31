import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { DatabaseService } from '../../../libs/common/database/database.service';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService /* extends DatabaseService */ {
  async create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return 'test';
    // return await this.prisma.user.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number /*, updateUserDto: UpdateUserDto*/) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
