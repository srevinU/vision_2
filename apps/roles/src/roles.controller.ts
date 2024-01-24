import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleAuthGuard } from '@app/common/guards/roles.guard';
import { JwtAuthGuard } from '@app/common/guards/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@UseGuards(RoleAuthGuard)
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.rolesService.findMany(userId);
  }

  @Delete(':roleId')
  removeAll(@Param('roleId') roleId: string) {
    return this.rolesService.remove(roleId);
  }
}
