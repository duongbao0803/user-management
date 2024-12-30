import { decryptData } from "../../../utils/index";
import Cookies from "js-cookie";

export function useDecryptCredentials() {
  const secretKey = "admin";
  const encryptedEmail = Cookies.get("email");
  const encryptedPassword = Cookies.get("password");

  if (encryptedEmail !== null && encryptedPassword !== null) {
    const email = decryptData(encryptedEmail, secretKey);
    const password = decryptData(encryptedPassword, secretKey);
    return { email, password, secretKey };
  } else {
    console.warn("Email and password are not set in Cookies");
    return { email: "", password: "" };
  }
}