import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [PrismaModule, ConfigModule],
})
export class ProductsModule {}
