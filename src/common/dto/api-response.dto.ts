import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 200 })
    status: number;

    @ApiProperty({ example: 'OK' })
    message: string;

    @ApiProperty()
    data: T;

    constructor(status: number, message: string, data: T, success = true) {
        this.success = success;
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static ok<T>(data: T, message = 'OK'): ApiResponse<T> {
        return new ApiResponse(200, message, data, true);
    }

    static created<T>(data: T, message = 'Creado exitosamente'): ApiResponse<T> {
        return new ApiResponse(201, message, data, true);
    }
}
