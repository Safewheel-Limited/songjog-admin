"use client";

// external imports
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";

// internal imports
import { GET_POKEMONS } from './graphql';
import Form from "@/components/Forms/Form";
import { FormValues } from "./interfaces";
import { loginSchema } from "./validation";
import { Button, Card, Flex } from "antd";
import FormInput from "@/components/Forms/FormInput";

export const revalidate = 5;

const Login = () => {
    const { data, error } = useSuspenseQuery(GET_POKEMONS);

    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
        console.log("data", data);
        // try { } catch (err: any) { }
    };

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
                            <FormInput name="username" label="Username" required placeholder="Enter User name" type="text" />
                            <FormInput name="password" label="Password" required placeholder="Enter your password" type="password" />
                            <Button
                                //  loading={loading} disabled={loading}
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