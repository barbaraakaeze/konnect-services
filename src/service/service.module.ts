import { Module } from '@nestjs/common';
import { ServicesService } from './service.service';
import { ServicesController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from './entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Services])],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServiceModule {}
