import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { errorMessages } from '@app/common/messages/errors';
import { ForbiddenException } from '@app/common/exeptions/index';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createRoleDto: CreateRoleDto) {
    const isRoleExisting = await this.isRoleUserExisting(createRoleDto);
    if (isRoleExisting)
      throw new ForbiddenException(errorMessages.roleExisting);
    return await this.prismaService.roles.create({ data: createRoleDto });
  }

  public async findAll() {
    return await this.prismaService.roles.findMany();
  }

  public async findMany(userId: string) {
    return await this.prismaService.roles.findMany({
      where: {
        userId: userId,
      },
    });
  }

  public async remove(roleId: string) {
    return await this.prismaService.roles.delete({ where: { id: roleId } });
  }

  private async isRoleUserExisting(createRoleDto: CreateRoleDto) {
    const result = await this.prismaService.roles.findMany({
      where: { name: createRoleDto.name, userId: createRoleDto.userId },
    });
    return result.length;
  }
}
