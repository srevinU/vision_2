import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    return await this.prismaService.users.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  public async findOneByEmail(email: string) {
    return await this.prismaService.users.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  public async remove(id: string) {
    return await this.prismaService.users.delete({
      where: {
        id: id,
      },
    });
  }
}
