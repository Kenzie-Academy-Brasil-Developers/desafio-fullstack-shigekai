export class AppError extends Error{
    status: number
    name: string

    constructor(message: string, status: number = 400){
        super(message)
        this.status = status
        this.name = "AppError"
    }
}