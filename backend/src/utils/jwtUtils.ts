import jwt from "jsonwebtoken";
import env from "../config/env";

class JwtUtils {
  static generateToken(id: string): string {
    return jwt.sign({}, env.jwt.secret, {
      subject: id,
    });
  }
}

export default JwtUtils;
