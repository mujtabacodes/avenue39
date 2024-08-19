import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesRecordService } from './sales_record.service';
import { CreateSalesRecordDto } from './dto/create-sales_record.dto';
import { get } from 'https';

@Controller('sales-record')
export class SalesRecordController {
  constructor(private readonly salesRecordService: SalesRecordService) {}

  @Post("add_sales")
  create(@Body() createSalesRecordDto: CreateSalesRecordDto) {
    return this.salesRecordService.Add_sales_record(createSalesRecordDto);
  }

  
  @Get()
  api_Tester(){
    return this.api_Tester()
  }


}
