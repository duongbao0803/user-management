import CryptoJS from "crypto-js";

export function decryptData(
    ciphertext,
    key
  ) {
    try {
      if (ciphertext === undefined) {
        throw new Error("Ciphertext cannot be undefined");
      }
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return null;
    }
  }
  