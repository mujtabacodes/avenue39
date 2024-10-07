import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AdminModule } from './admin/admin.module';
import { SalesRecordModule } from './sales_record/sales_record.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { PaymobModule } from './paymob/paymob.module';
import { SketchfabModule } from './sketchfab/sketchfab.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    ProductsModule,
    CategoriesModule,
    ReviewsModule,
    AdminModule,
    SalesRecordModule,
    SubcategoriesModule,
    PaymobModule,
    SketchfabModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
