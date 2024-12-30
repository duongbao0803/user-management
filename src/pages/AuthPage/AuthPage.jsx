import { LoadingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Image, Input, Spin } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuthPage from "./hooks/useAuthPage";

const AuthPage = () => {
  const {
    form,
    setIsShowRegister,
    isLoggingIn,
    setRememberMe,
    setIsShowForgotPassword,
    onFinish,
    handleGoogleSignIn,
    email,
    password,
  } = useAuthPage();

  return (
    <>
      <main className="flex flex-grow bg-[hsl(0,0%,97%)]">
        <section className="container mx-auto grid h-screen flex-grow flex-row place-items-center bg-[hsl(0,0%,97%)]">
          <div className="mx-5 my-2 grid min-h-[400px] w-full max-w-[450px] grid-cols-1 overflow-hidden rounded-[30px] border-none bg-[#fff] transition-all duration-500 sm:min-w-[450px] sm:max-w-[500px] sm:border lg:grid lg:min-h-[650px] lg:max-w-[1024px] lg:grid-cols-2 lg:shadow-lg">
            <div className="order-2 my-auto items-center overflow-hidden px-7 lg:px-16">
              <section className="py-10">
                <motion.div
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h1 className="text-center text-2xl font-bold text-primary transition-all duration-500 lg:text-3xl">
                    CHÀO MỪNG TRỞ LẠI
                  </h1>
                  <p className="mx-4 mb-5 mt-3 text-center text-sm text-[#a3a1a1] transition-all duration-500 lg:mx-9 lg:text-[15px]">
                    Trải nghiệm mua sắm vật liệu xây dựng chất lượng với {""}
                    <span>
                      <Link
                        href="/"
                        className="group relative cursor-pointer font-bold text-primary"
                      >
                        FRICKS
                        <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                      </Link>
                      <span>.</span>
                    </span>
                    {""} Bắt đầu ngay.
                  </p>
                </motion.div>
                <Form
                  name="normal_login"
                  className="login-form"
                  form={form}
                  onFinish={onFinish}
                >
                  <motion.div
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-9"
                  >
                    <Form.Item
                      name="email"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email",
                        },
                        {
                          type: "email",
                          message: "Vui lòng nhập đúng kiểu email",
                        },
                      ]}
                      colon={true}
                      labelCol={{ span: 24 }}
                      className="formItem"
                      initialValue={email}
                    >
                      <Input
                        placeholder="Email"
                        type="email"
                        className="hover:border-primary focus:border-primary"
                        autoFocus
                      />
                    </Form.Item>
                  </motion.div>
                  <motion.div
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu",
                        },
                        {
                          min: 4,
                          max: 20,
                          message: "Mật khẩu phải có ít nhất 8 kí tự",
                        },
                      ]}
                      labelCol={{ span: 24 }}
                      className="formItem"
                      initialValue={password}
                      hasFeedback
                    >
                      <Input
                        placeholder="Mật khẩu"
                        type="password"
                        className="hover:border-primary focus:border-primary"
                      />
                    </Form.Item>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <Form.Item
                      name="remember"
                      valuePropName="checked"
                      noStyle
                      className="mt-4"
                    >
                      <Checkbox
                        onChange={(e) => setRememberMe(e.target.checked)}
                      >
                        Ghi nhớ
                      </Checkbox>

                      <a
                        href="#"
                        className="group relative float-right cursor-pointer font-semibold text-primary hover:text-primary"
                        onClick={() => setIsShowForgotPassword(true)}
                      >
                        Quên mật khẩu
                        <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                      </a>
                    </Form.Item>
                  </motion.div>
                  <motion.div
                    initial={{ x: 50 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Form.Item name="">
                      <Button
                        htmlType="submit"
                        className="mx-auto flex justify-center mt-5 flex h-11 w-full items-center rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80"
                      >
                        {isLoggingIn ? (
                          <Spin
                            indicator={
                              <LoadingOutlined className="text-[#fff]" />
                            }
                          />
                        ) : (
                          "Đăng nhập"
                        )}
                      </Button>
                    </Form.Item>
                  </motion.div>
                  {/* <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
              >
                <Drawer open={isDrawerVisible} onClose={handleDrawerClose}>
                  <DrawerTrigger asChild>
                    <Form.Item noStyle>
                      <ButtonCustom className="mx-auto mt-5 flex h-11 w-full items-center rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80">
                        {isLoggingIn ? (
                          <Spin
                            indicator={
                              <LoadingOutlined className="text-[#fff]" />
                            }
                          />
                        ) : (
                          "Đăng nhập"
                        )}
                      </ButtonCustom>
                    </Form.Item>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <motion.div
                        key="enterOTP"
                        initial={{ x: 0, opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -150, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DrawerHeader>
                          <DrawerTitle className="text-2xl">
                            Nhập mã OTP
                          </DrawerTitle>
                          <DrawerDescription className="text-[#a3a1a1]">
                            Nhập mã OTP đã được gửi đến email của bạn
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="pb-0">
                          <div className="flex items-center justify-center space-x-2 px-5">
                            <InputOTP
                              maxLength={6}
                              className="px-5"
                              onChange={(value) => setOtp(value)}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </div>
                        </div>
                        <DrawerFooter>
                          <ButtonCustom
                            className="mx-auto flex h-11 w-full items-center rounded-[5px] bg-primary text-sm tracking-wider text-white hover:bg-primary/80"
                            onClick={handleOTPSubmit}
                          >
                            Xác nhận
                          </ButtonCustom>
                          <ButtonCustom
                            onClick={handleResendMail}
                            className="mx-auto block h-11 w-full rounded-[5px] border border-gray-300 bg-[#fff] shadow-none hover:!border-primary hover:!bg-transparent hover:!text-primary"
                          >
                            Gửi lại
                          </ButtonCustom>
                        </DrawerFooter>
                      </motion.div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </motion.div> */}
                </Form>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="mt-4 flex items-center justify-center text-center">
                    <div className="mr-2 h-[1px] w-full bg-[#e6e8eb]"></div>
                    <span className="text-[#999999]">hoặc</span>
                    <div className="ml-2 h-[1px] w-full bg-[#e6e8eb]"></div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Button
                    onClick={handleGoogleSignIn}
                    className="mx-auto mt-5 block h-11 w-full rounded-[5px] border border-gray-300 bg-[#fff] text-[grey] shadow-none hover:!border-primary hover:!bg-transparent hover:!text-primary"
                  >
                    <div className="flex items-center justify-center tracking-wider">
                      <Image
                        src="https://freesvg.org/img/1534129544.png"
                        width={30}
                        height={30}
                        quality={100}
                        alt=""
                        className="mr-2"
                      />
                      Tiếp tục với Google
                    </div>
                  </Button>

                  <div className="mt-3 text-center text-sm">
                    <span className="text-black">Bạn đã có tài khoản?</span>{" "}
                    {""}
                    <a
                      href="#"
                      className="login-form-forgot group relative cursor-pointer font-semibold text-primary hover:text-primary"
                      onClick={() => setIsShowRegister(true)}
                    >
                      Đăng ký
                      <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  </div>
                </motion.div>
              </section>
            </div>
            <div className="order-1  hidden rounded-xl transition-all duration-500 lg:block">
              {/* <Carousel /> */}
              <Image
                height={"100%"}
                className="object-cover"
                src="https://i.chungta.vn/2023/08/14/-4770-1691992926_1200x0.jpg"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AuthPage;
