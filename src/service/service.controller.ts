import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ServicesService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Request } from 'express';

@Controller('api/service')
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return this.serviceService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Get('/versions/:id')
  findServiceVersions(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Get('/search/:name')
  async search(@Param('name') name: Request) {
    return this.serviceService.search(name)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
