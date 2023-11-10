import { HttpException, HttpStatus } from "@nestjs/common";

export class CreateSuccess extends HttpException {
    constructor (message: string) {
        super(message, HttpStatus.CREATED)
    }
}

export class NotException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_GATEWAY)
    }
}

export class NotFound extends HttpException {
    constructor(message:string) {
        super(message, HttpStatus.NOT_FOUND)
    }
}