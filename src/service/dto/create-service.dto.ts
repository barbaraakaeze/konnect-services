import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
//class-validator is responsible for ensuring that the values received in our DTO are in accordance with what we expect.

export class CreateServiceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    description: string
}
