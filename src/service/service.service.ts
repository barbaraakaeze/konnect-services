import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findOne(id: string): Promise<Service> {
    const result = this.repository.findOne(id);
    if (!result) {
      throw new NotFoundException(`Service ${id} cannot be found`);
    }
    return result;
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

  async search(name: Request): Promise<Service[]> {
    try {
      // Implementing the search filter
      //  ILIKE case insensitve for search
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

  // Query first page without cursor using a given param
  /*async firstPageCursorPagination() {
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
    return {
      cursor: cursor,
      data: data
    }
  }

  async nextPagePagination(cursor) {
    const nextPaginator = buildPaginator({
      entity: Service,
      paginationKeys: ['id'],
      query: {
        limit: 12,
        order: 'ASC',
        afterCursor: cursor.afterCursor,
      },
    });

    const { data, cursor } = await nextPaginator.paginate(queryBuilder);
    return {
      cursor: cursor,
      data: data
    }
  }

  previousPagePagination(cursor) {
    const prevPaginator = buildPaginator({
      entity: Service,
      paginationKeys: ['id'],
      query: {
        limit: 10,
        order: 'ASC',
        beforeCursor: cursor.beforeCursor,
      },
    });

    const { data, cursor } = await prevPaginator.paginate(queryBuilder);
  }*/
}
