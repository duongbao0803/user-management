import { Form } from "antd";
import { useState } from "react";
// import { useLoginMutation } from "../../../services/userApi";
import { useNavigate } from "react-router-dom";
import { useDecryptCredentials } from "./useDecryptCredentials";
import Cookies from "js-cookie";
import useAuth from "@/hooks/useAuth";

const useAuthPage = () => {
  // const provider = new GoogleAuthProvider();
  // const { HTTP_STATUS } = COMMON_CONSTANT;
  const [isShowRegister, setIsShowRegister] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);
  const [form] = Form.useForm();
  // const [login] = useLoginMutation();
  const { navigate } = useNavigate();
  const [otpCode, setOtp] = useState("");
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const { email, password, secretKey } = useDecryptCredentials();
  // const { loginPermission } = useAuth();

  const onFinish = async (payload) => {
    setIsLoggingIn(true);
    // Cookies.set("__token", response.credential);
    const authStore = useAuth.getState();
    authStore.login();
    // try {
    //   const res = await axios.post("http://localhost:8080/auth/login", payload);
    //   if (res && res.status === HTTP_STATUS.SUCCESS.OK) {
    //     const accessToken = res.data.data.accessToken;
    //     const refreshToken = res.data.data.refreshToken;

    //     if (accessToken) {
    //       const decoded = jwtDecode(accessToken);
    //       const role = decoded["role"];

    //       if (role !== "ADMIN") {
    //         notify("error", "Bạn không có quyền truy cập vào trang này", 3);
    //         setIsLoggingIn(false);
    //         return;
    //       } else {
    //         Cookies.set("accessToken", accessToken);
    //         Cookies.set("refreshToken", refreshToken);
    //         if (rememberMe) {
    //           const encryptedEmail = encryptData(email, secretKey);
    //           const encryptedPassword = encryptData(password, secretKey);
    //           Cookies.set("email", encryptedEmail);
    //           Cookies.set("password", encryptedPassword);
    //         }
    //         alert("");
    //         loginPermission({ ...payload, role: role });
    //         // navigate.replace("/");
    //         notify("success", "Đăng nhập thành công", 3);
    //         setIsLoggingIn(false);
    //       }
    //     }
    //   }
    // } catch (err) {
    //   console.log("check er", err);
    //   const errorCode = err.error;
    //   if (
    //     errorCode &&
    //     errorCode.status === HTTP_STATUS.CLIENT_ERROR.UNAUTHORIZED
    //   ) {
    //     notify("error", `${err.data.message}`, 3);
    //     setIsLoggingIn(false);
    //     return;
    //   }
    //   notify("error", `${err.message}`, 3);
    //   setIsLoggingIn(false);
    // } finally {
    //   setIsLoggingIn(false);
    // }
  };

  // const handleGoogleSignIn = async () => {
  //   provider.setCustomParameters({
  //     prompt: "select_account",
  //   });
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const credentials = await result.user.getIdTokenResult();
  //     const accessToken = credentials.token;
  //     const res = await loginGoogle(JSON.stringify(accessToken)).unwrap();
  //     if (res && res.httpCode === 200) {
  //       Cookies.set("accessToken", res.accessToken);
  //       Cookies.set("refreshToken", res.refreshToken);
  //       router.replace("/");
  //       notify("success", `${res.message}`, 2);
  //     }
  //   } catch (err) {
  //     if (isErrorResponse(err)) {
  //       notify("error", `${err.data.message}`, 3);
  //     }
  //   }
  // };

  // const handleOTPSubmit = async () => {
  //   const email = form.getFieldValue("email");
  //   let information = { email, otpCode };
  //   if (otpCode.length < 6) {
  //     notify("warning", "Vui lòng nhập otp", 2);
  //     return;
  //   }
  //   try {
  //     const res = await confirmEmail(information).unwrap();
  //     if (res && res.httpCode === 200) {
  //       const accessToken = res.accessToken;
  //       if (accessToken) {
  //         Cookies.set("accessToken", res.accessToken);
  //         Cookies.set("refreshToken", res.refreshToken);
  //         router.push("/");
  //         notify("success", "Đăng nhập thành công", 2);
  //       }
  //     }
  //   } catch (err) {
  //     if (isErrorResponse(err)) {
  //       notify("error", `${err.data.message}`, 3);
  //     }
  //   }
  // };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  // const handleResendMail = async () => {
  //   const email = form.getFieldValue("email");
  //   if (!email) {
  //     notify("warning", "Vui lòng nhập email", 3);
  //     return;
  //   }
  //   if (isResending) {
  //     notify(
  //       "warning",
  //       `Vui lòng chờ ${cooldownTime} giây trước khi gửi lại mã OTP`,
  //       3,
  //     );
  //     return;
  //   }
  //   setIsResending(true);
  //   setCooldownTime(30);
  //   try {
  //     const res = await resendOtp(JSON.stringify(email)).unwrap();
  //     if (res && res.httpCode === 200) {
  //       notify("success", `${res.message}`, 3);
  //       const countdownInterval = setInterval(() => {
  //         setCooldownTime((prev) => {
  //           if (prev === 1) {
  //             clearInterval(countdownInterval);
  //             setIsResending(false);
  //           }
  //           return prev - 1;
  //         });
  //       }, 1000);
  //     }
  //   } catch (err) {
  //     if (isErrorResponse(err)) {
  //       notify("error", `${err.data.message}`, 3);
  //     } else {
  //       notify("error", `${err}`, 3);
  //     }
  //   }
  // };

  return {
    form,
    isShowRegister,
    setIsShowRegister,
    isLoggingIn,
    rememberMe,
    setRememberMe,
    isShowForgotPassword,
    setIsShowForgotPassword,
    otpCode,
    setOtp,
    isDrawerVisible,
    setIsDrawerVisible,
    isResending,
    cooldownTime,
    onFinish,
    handleDrawerClose,
    email,
    password,
  };
};

export default useAuthPage;
