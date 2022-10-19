import { PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}

// Here extendsPartialType(CreateItemDto) does the job by taking the properties of CreateItemDto
// and reusing them automatically; however, it now turns all attributes as optionals.
