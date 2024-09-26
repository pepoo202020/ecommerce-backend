import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        // Construct the standardized response format
        return {
          success:
            data?.success !== undefined
              ? data.success
              : statusCode >= 200 && statusCode < 300,
          message: data?.message || 'Request successful',
          records: Array.isArray(data?.data) ? data.data.length : 0, // Only count if data is an array
          data: data?.data !== undefined ? data.data : null, // Handle cases where no data is provided
          statusCode: statusCode,
        };
      }),
      // Handle errors and return a proper response
      catchError((err) => {
        const statusCode =
          err instanceof HttpException
            ? err.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        return throwError(() => ({
          success: false,
          message: err.message || 'Internal server error',
          data: null,
          statusCode: statusCode,
        }));
      }),
    );
  }
}
