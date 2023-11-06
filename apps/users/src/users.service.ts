import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@app/common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly Prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return await this.Prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.Prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return await this.Prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return await this.Prisma.user.upsert({
      where: {
        id: id,
      },
      update: updateUserDto,
      create: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.Prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
