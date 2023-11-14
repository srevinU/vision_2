import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly Prisma: PrismaService) {}

  async findOneByEmail(email: string) {
    return await this.Prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
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
