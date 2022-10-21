import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Services } from './entities/service.entity';
import { Request } from 'express';

@Injectable()
export class ServicesService {
  constructor(@InjectRepository(Services) private readonly repository: Repository<Services>) { }

  create(createServiceDto: CreateServiceDto): Promise<Services> {
    const service = this.repository.create(createServiceDto);
    return this.repository.save(service);
  }

  async findAll(options?: Request): Promise<Services[]> {
    // SORTING
    // possibly use a PERSSIMISTIC_READ to prevent changes while we are loading data
    if (options.query.sort) {
      const result = this.repository.createQueryBuilder("service")
      .orderBy("service.name")
      .getMany();

      return result;
    }

    // PAGINATION
    if(options.query.page) {
      const result = this.paginate(options);
      return result;
    }

    return this.repository.find();
  }

  async findOne(id: string): Promise<Services> {
    const result = this.repository.findOne(id);
    if (!result) {
      throw new NotFoundException(`Service ${id} cannot be found`);
    }
    return result;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Services> {
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

  private paginate(params) {
    if(params.query.page) {
      const page: number = parseInt(params.query.page as any) || 1;
      const limit = 12;
      const result = this.repository.createQueryBuilder("service")
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

      return result;
    }
  }

  async search(name: Request): Promise<Services[]> {
    try {
      // Implementing the search filter
      if(name) {
        const result = this.repository.createQueryBuilder("service")
        .where("service.name ILIKE :name", { name: `%${name}%` })
        .orWhere("service.description ILIKE :description", { description: `%${name}%` })
        .getMany();

        return result;
      }
      return [];
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findServiceVersions(id?: any): Promise<number> {
    console.log(`called`);
    const result = (await this.repository.createQueryBuilder("service") .where("service.id = :id", { id: id }).getOne()).versions;
    console.log(`Version Nmber:`, result);
    return result;
  }
}
