export enum StatusCodes {
    OK = 200,
    BadRequest = 400,
    Unauthorized,
    PaymentRequired,
    Forbidden,
    NotFound,
    TooManyRequests = 429,
    InternalServerError = 500,
    BadGateway = 502,
    ServerUnavailable = 503,
  }