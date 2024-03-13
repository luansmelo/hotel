import bcrypt from "bcrypt";

export interface HasherProtocol {
  hash(value: string): Promise<string>;
}

export interface HasherCompare {
  compare(value: string, hashValue: string): Promise<boolean>;
}

export class BcrypterAdapter implements HasherProtocol, HasherCompare {
  private readonly salt: number;
  constructor(salt: number) {
    this.salt = salt;
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }

  async compare(value: string, hashValue: string): Promise<boolean> {
    const hash = await bcrypt.compare(value, hashValue);
    return hash;
  }
}
