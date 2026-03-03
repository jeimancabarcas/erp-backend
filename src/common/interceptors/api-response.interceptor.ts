import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../dto/api-response.dto';

@Injectable()
export class ApiResponseInterceptor<T>
    implements NestInterceptor<T, ApiResponse<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ApiResponse<T>> {
        const httpCtx = context.switchToHttp();
        const response = httpCtx.getResponse<{ statusCode: number }>();

        return next.handle().pipe(
            map((data) => {
                const statusCode: number =
                    (response as unknown as { statusCode: number }).statusCode ??
                    HttpStatus.OK;

                const message =
                    statusCode === HttpStatus.CREATED ? 'Creado exitosamente' : 'OK';

                return new ApiResponse(statusCode, message, data, true);
            }),
        );
    }
}
