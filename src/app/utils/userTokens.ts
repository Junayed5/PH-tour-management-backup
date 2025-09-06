import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";

const createUserToken = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
      };
    
      const accessToken = generateToken(jwtPayload, envVars.JWT_SECRET, envVars.JWT_ACCESS_EXPIRY);
    
      const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRY)

      return {
        accessToken,
        refreshToken
      }
}

export default createUserToken;