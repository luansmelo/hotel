import jwt from "jsonwebtoken";

export interface Encrypter {
  encrypt(payload: string | object | Buffer): Promise<string>;
}

export interface Decrypter {
  decrypt(token: string): Promise<string | object | null>;
}

export interface Verify {
  verify: (token: string) => Promise<boolean>;
}

export class JwtAdapter implements Encrypter, Decrypter, Verify {
  constructor(
    private readonly secret: string,
    private readonly expires: string = "4d"
  ) { }

  async encrypt(payload: string | object | Buffer): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expires,
    });
  }

  async decrypt(token: string): Promise<string | object | null> {
    return jwt.verify(token, this.secret);
  }

  async verify(token: string): Promise<boolean> {
    try {
      const decoded = await jwt.verify(token, this.secret);
      return !!decoded;
    } catch (error) {
      return false;
    }
  }
}
