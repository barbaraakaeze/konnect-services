import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { Request } from 'express';
import { buildPaginator } from 'typeorm-cursor-pagination';

@Injectable()
export class ServiceService {
  constructor(@InjectRepository(Service) private readonly repository: Repository<Service>) { }

  create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.repository.create(createServiceDto);
    return this.repository.save(service);
  }

  async findAll(options?: Request): Promise<Service[]> {
    // Implementing the search filter
    // if search params is set, pass to DB
    //  ILIKE case insensitve for search
    if(options.query.s) {
     const result = this.repository.createQueryBuilder("service")
     .where("service.name ILIKE :name", { name: `%${options.query.s}%` })
     .orWhere("service.description ILIKE :name", { name: `%${options.query.s}%` })
     .getMany();

     return result;
    }
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
      const page: number = parseInt(options.query.page as any) || 1;
      const limit = 12;
      const result = this.repository.createQueryBuilder("service")
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

      return result;
    }

    // Query first page without cursor using a given param
    const queryBuilder = this.repository.createQueryBuilder("service")
    .where("service.name ILIKE :name", { name: `%${options.query.s}%` })

    const paginator = buildPaginator({
      entity: Service,
      paginationKeys: ['id'],
      query: {
        limit: 12,
        order: 'ASC',
      },
    })
    const { data, cursor } = await paginator.paginate(queryBuilder);

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
