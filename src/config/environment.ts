import "dotenv/config";
import crypto from "crypto";

const keyPair = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: "top secret",
  },
});

const publicKey = keyPair.publicKey;
const privateKey = keyPair.privateKey;

const CONFIG = {
  db: process.env.DB,
  jwt_public: publicKey,
  jwt_private: privateKey,
};

export default CONFIG;
