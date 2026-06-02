class ApiResponse {
    constructor(
        statusCode,
        data,
        message = "Success"
    ){
        super(message);
        this.statusCode = statusCode >= 200 && statusCode < 400;
        this.data = data;
        this.message = message
    }
}

export { ApiResponse }