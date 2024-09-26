import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateBrandDTO {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsBoolean()
  isActive: boolean;
}
