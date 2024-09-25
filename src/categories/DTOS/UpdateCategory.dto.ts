import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDTO } from './CreateCategory.dto';

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
