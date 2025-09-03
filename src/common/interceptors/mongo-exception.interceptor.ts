import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MongoExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.name === 'CastError') {
          return throwError(() => new BadRequestException('Invalid ID format'));
        }
        if (error.name === 'ValidationError') {
          return throwError(() => new BadRequestException('Validation failed'));
        }
        return throwError(() => error);
      }),
    );
  }
}
