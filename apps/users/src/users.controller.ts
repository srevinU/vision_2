import { UsersService } from './users.service';
import { RoleAuthGuard } from '@app/common/guards/roles.guard';
import { JwtAuthGuard } from '@app/common/guards/auth.guard';
import { Get, Param, Delete, Controller, UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@UseGuards(RoleAuthGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':email')
  findOne(@Param('email') email: string): Promise<any> {
    return this.usersService.findOneByEmail(email);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string): Promise<any> {
    return this.usersService.remove(userId);
  }
}
