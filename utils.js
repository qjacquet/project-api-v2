export class Utils {

    static getDbStr() {
        return process.env.DB_PROVIDER + '://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB_DATABASE_NAME;
    }
    
    static getSecretToken() {
        return process.env.SECRET_TOKEN;
    }
}
