import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //Load .env globally
    MongooseModule.forRoot(process.env.MONGO_URL), CategoriesModule, BrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
