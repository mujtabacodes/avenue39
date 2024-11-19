import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalesRecordService } from './sales_record.service';
import { CreateSalesRecordDto } from './dto/create-sales_record.dto';

@Controller('sales-record')
export class SalesRecordController {
  constructor(private readonly salesRecordService: SalesRecordService) {}

  @Post('add_sales')
  create(@Body() createSalesRecordDto: CreateSalesRecordDto) {
    return this.salesRecordService.Add_sales_record(createSalesRecordDto);
  }

  @Get('order_history')
  order_history() {
    return this.salesRecordService.order_history();
  }

  @Get('get_all_records')
  get_total_records() {
    return this.salesRecordService.get_all_records();
  }

  @Get('getMonthlySales')
  getMonthlySales() {
    return this.salesRecordService.getMonthlySales();
  }

  @Get('getWeeklySales_record')
  getWeeklySales_record() {
    return this.salesRecordService.getWeeklySales_record();
  }

  @Get()
  api_Tester() {
    return this.salesRecordService.apiTester();
  }
}
