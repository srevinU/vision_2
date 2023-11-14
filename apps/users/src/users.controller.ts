import { Get, Param, Delete, Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@app/common/guards/auth.guard';

@Controller('api/users')
@UseGuards(AuthGuard)
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
