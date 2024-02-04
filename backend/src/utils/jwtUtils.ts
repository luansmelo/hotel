import jwt from "jsonwebtoken";
import env from "../config/env";

class JwtUtils {
  static generateToken(id: string, role: string): string {
    const tokenPayload = {
      sub: id,
      role: role,
    };

    return jwt.sign(tokenPayload, env.jwt.secret, {});
  }
}

export default JwtUtils;
