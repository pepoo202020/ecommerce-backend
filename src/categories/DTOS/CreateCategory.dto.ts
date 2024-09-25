import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  parent?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
