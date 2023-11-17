import { Get, Param, Delete, Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@app/common/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':email')
  findOne(@Param('email') email: string): Promise<any> {
    return this.usersService.findOneByEmail(email);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.usersService.remove(id);
  }
}
