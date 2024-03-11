import bcrypt from "bcrypt";

export interface Encrypter {
  encrypt(value: string): Promise<string>;
}

export interface Decrypter {
  decrypt(value: string, hashValue: string): Promise<boolean>;
}

export class BcrypterAdapter implements Encrypter, Decrypter {
  private readonly salt: number;
  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }

  async decrypt(value: string, hashValue: string): Promise<boolean> {
    const hash = await bcrypt.compare(value, hashValue);
    return hash;
  }
}
