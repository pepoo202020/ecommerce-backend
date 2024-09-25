import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        return {
          success:
            data?.success !== undefined
              ? data.success
              : statusCode >= 200 && statusCode < 300,
          message: data?.message || 'Request successful', // Default message if not provided
          records: data?.data.length || 0,
          data: data?.data !== undefined ? data.data : null, // Check if data object exists, otherwise fallback to entire response
          statusCode: statusCode, // The HTTP status code
        };
      }),
    );
  }
}
