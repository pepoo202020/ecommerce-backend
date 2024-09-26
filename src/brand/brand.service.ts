import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand, BrandDocument } from 'src/models/Brand.model';
import { CreateBrandDTO } from './DTO/createBrand.dto';
import { Model } from 'mongoose';
import { UpdateBrandDTO } from './DTO/updateBrand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
  ) {}

  //SECTION - ADD THE BRAND --BY ADMIN
  async addBrand(createBrandDto: CreateBrandDTO): Promise<Brand> {
    const newBrand = new this.brandModel(createBrandDto);
    return newBrand.save();
  }

  //SECTION - UPDATE THE BRAND --BY ADMIN
  async updateBrand(
    id: string,
    updateBrandDTO: UpdateBrandDTO,
  ): Promise<Brand> {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException('Brand Not Found');
    }
    const updatedBrand = await this.brandModel
      .findByIdAndUpdate(id, updateBrandDTO, { new: true })
      .exec();
    return updatedBrand;
  }

  //SECTION - DELETE BRAND --BY ADMIN
  async deleteBrand(id: string): Promise<any> {
    try {
      const brand = await this.brandModel.findById(id).exec();
      if (!brand) {
        throw new NotFoundException('Brand Not Found');
      }

      await this.brandModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error('Error while deleting brand:', error);
      throw new InternalServerErrorException('Failed to delete the brand');
    }
  }

  //SECTION -  VIEW BRAND --ALL
  async viewBrand(id: string): Promise<Brand> {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException('Brand Not Found');
    }
    return brand;
  }

  //SECTION - VIEW ALL BRANDS --ALL
  async viewAllBrands(): Promise<Brand[]> {
    const brands = await this.brandModel.find();
    if (brands.length === 0) {
      throw new NotFoundException('No Brands Found');
    }
    return brands;
  }
}
