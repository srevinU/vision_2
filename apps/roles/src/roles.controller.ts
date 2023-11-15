import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Delete(':id')
  removeAll(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
