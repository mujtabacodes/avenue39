import { HttpException, HttpStatus } from '@nestjs/common';
export const customHttpException = (error: string, status: string) => {
  throw new HttpException(error, HttpStatus[status]);
};
