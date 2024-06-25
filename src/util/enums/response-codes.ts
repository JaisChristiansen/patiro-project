export class ResponseCodes {
  public static readonly UNAUTHORIZED = 401;
  public static readonly SUCCESS = 200;
  public static readonly BAD_REQUEST = 400;
  public static readonly INTERNAL_SERVER_ERROR = 500;

  public static is2xx = (responseCode: number) => {
    return responseCode >= 200 && responseCode < 300;
  };
}
