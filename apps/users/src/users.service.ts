import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly Prisma: PrismaService) {}

  public async findOneByEmail(email: string) {
    return await this.Prisma.users.findUnique({
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

  public async remove(id: string) {
    return await this.Prisma.users.delete({
      where: {
        id: id,
      },
    });
  }
}
