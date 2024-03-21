"use client";

// external imports
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Flex, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

// internal imports
import { authKey, refreshToken } from "@/common/constants";
import FormInput from "@/components/Forms/FormInput";
import { isLoggedIn } from "@/common/services";
import { storeCookies } from "@/common/utils";
import { useRouter } from "next/navigation";
import Form from "@/components/Forms/Form";
import { loginSchema } from "./validation";
import { ADMIN_LOGIN } from "./graphql";
import { FormValues } from "./types";

// export const revalidate = 5;

const Login = () => {
    const [adminLogin, { loading, error }] = useMutation(ADMIN_LOGIN);
    const router = useRouter();
    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
        try {
            const result = await adminLogin({
                variables: {
                    input: {
                        phoneOrEmail: data.phoneOrEmail,
                        password: data.password,
                    }
                }
            })
            if (result?.data?.adminSignIn?.accessToken) {
                storeCookies(authKey, result?.data?.adminSignIn?.accessToken);;
                storeCookies(refreshToken, result?.data?.adminSignIn?.refreshToken)
                router.push("/profile");
                message.success("User logged in successfully!");
            }
        } catch (error) {
            // console.log("error", error)
        }
    };
    useEffect(() => {
        if (isLoggedIn()) {
            router.push("/profile")
        }
    }, [router])
    return (
        <div
            style={{
                backgroundImage:
                    'url("https://safewheel.sgp1.cdn.digitaloceanspaces.com/others/engin-akyurt-HEMIBJ8QQuA-unsplash%20(3).jpg")',
                height: "100vh",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "96vh",
                }}
            >
                <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
                    <Card style={{ width: 400 }}>
                        {/* <img src={Logo} alt="" style={{ width: "120px" }} /> */}
                        <Flex vertical gap="large">
                            <FormInput name="phoneOrEmail" label="Phone Or Email" required placeholder="Enter Your Phone or Email" type="text" />
                            <FormInput name="password" label="Password" required placeholder="Enter your password" type="password" />
                            <Button
                                loading={loading}
                                disabled={loading}
                                type="primary"
                                htmlType="submit"
                                block
                            >
                                Login
                            </Button>
                        </Flex>
                    </Card>
                </Form>
            </div>
        </div>
    )
}

export default Login;