import { HasherComparer } from "@/data/protocols/cryptography/hash-comparer";
import { Hasher } from "@/data/protocols/cryptography/hasher";

import bcrypt from "bcrypt";

export class BcryptAdapter implements Hasher, HasherComparer {
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
