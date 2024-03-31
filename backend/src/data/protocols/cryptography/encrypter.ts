export interface Encrypter {
    encrypt(payload: string | object | Buffer): Promise<string>;
}