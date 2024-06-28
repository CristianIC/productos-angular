export class PathsApi {
    public static readonly PATH_API_AUTH = 'http://localhost:8080/auth';
    public static readonly PATH_AUTH_LOGIN = this.PATH_API_AUTH + '/login';
    public static readonly PATH_AUTH_REFREST_TOKEN = this.PATH_API_AUTH + '/refresh';
}