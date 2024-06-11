import jsonwebtoken from "jsonwebtoken";
import CONFIG from "../config/environment";

export const signJWT = (
  payload: Object,
  options?: jsonwebtoken.SignOptions
) => {
  const privateKey = CONFIG.jwt_private.replace(/\\n/g, "\n");
  return jsonwebtoken.sign(
    payload,
    { key: privateKey, passphrase: "top secret" },
    { ...options, algorithm: "RS256" }
  );
};

export const verifyJWT = (token: string) => {
  try {
    const publicKey = CONFIG.jwt_public.replace(/\\n/g, "\n");
    const decoded = jsonwebtoken.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "JWT expired",
      decoded: null,
    };
  }
};
