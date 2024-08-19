export interface CreateSalesRecordDto {
    user_email: string;
    products: any[];
  }
  
  export interface CreateSalesRecordProductDto {
    quantity: number;
    productData: any; 
  }