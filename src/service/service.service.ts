import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(@InjectRepository(Service) private readonly repository: Repository<Service>) { }

  create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.repository.create(createServiceDto);
    return this.repository.save(service);
  }

  findAll(): Promise<Service[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Service> {
    return this.repository.findOne(id);
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await this.repository.preload({
      id: id,
      ...updateServiceDto,
    });
    if (!service) {
      throw new NotFoundException(`Service ${id} cannot be found`);
    }
    return this.repository.save(service);
  }

  async remove(id: string) {
    const service = await this.findOne(id);
    return this.repository.remove(service);
  }
}
