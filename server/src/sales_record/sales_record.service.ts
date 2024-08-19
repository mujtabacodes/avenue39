import { Injectable } from '@nestjs/common';
import { CreateSalesRecordDto } from './dto/create-sales_record.dto';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from 'src/utils/helper';


@Injectable()
export class SalesRecordService {
  constructor(private prisma: PrismaService) {}

  async Add_sales_record(data: CreateSalesRecordDto) {
    try {
      console.log(data, "data");
  
      const transaction = await this.prisma.$transaction(async (prisma) => {
        for (const product of data.products) {
          const existingProduct = await prisma.products.findUnique({
            where: { id: product.id },
          });
  
          if (!existingProduct) {
            throw new Error(`Product with ID ${product.id} not found`);
          }
  
          if (existingProduct.stock < product.quantity) {
            throw new Error(
              `Not enough stock for product with ID ${product.id}. Available stock: ${existingProduct.stock}`
            );
          }
  
          await prisma.products.update({
            where: { id: product.id },
            data: {
              stock: existingProduct.stock - product.quantity,
            },
          });
        }
  
        const existingSalesRecord = await prisma.sales_record.findUnique({
          where: { user_email: data.user_email },
          include: { products: true },
        });
  
        let newSalesRecord;
  
        if (existingSalesRecord) {
          newSalesRecord = await prisma.sales_record.update({
            where: { user_email: data.user_email },
            data: {
              products: {
                create: data.products.map((product) => ({
                  quantity: product.quantity,
                  productData: product,
                })),
              },
            },
          });
        } else {
          newSalesRecord = await prisma.sales_record.create({
            data: {
              user_email: data.user_email,
              products: {
                create: data.products.map((product) => ({
                  quantity: product.quantity,
                  productData: product,
                })),
              },
            },
          });
        }
  
        return newSalesRecord;
      });
  
      return transaction;
    } catch (error: unknown) {
      if (error instanceof Error) {
        customHttpException(error.message, "INTERNAL_SERVER_ERROR");
      } else {
        customHttpException("An unknown error occurred", "INTERNAL_SERVER_ERROR");
      }
    }
  }
  
  

apiTester(){
  return "api is working"
}

}
