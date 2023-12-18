import {
  Box,
  Button,
  Center,
  Fieldset,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { AuthService, AuthServiceLoginProps } from "@/services/authService";
import Head from "next/head";
import { useAuthContext } from "@/components/atoms/Auth/auth.context";

const LoginPage = () => {
  const router = useRouter();
  const { setInitializing } = useAuthContext();

  const handleLogin = async (payload: AuthServiceLoginProps) => {
    try {
      setInitializing(true);
      const response = await AuthService.login(payload);
      if (response.status === 200) {
        alert("Berhasil melakukan login!");
        setTimeout(() => {
          setInitializing(false);
          localStorage.setItem("access_token", response.data.data.access_token);
          router.push("/");
        }, 500);
      } else {
        alert("Gagal melakukan login!");
        setInitializing(false);
      }
    } catch (error: any) {
      alert("Gagal melakukan login!");
      setInitializing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box h={"100vh"} bg={"#377FA9"}>
        <Center mih={"90vh"}>
          <Fieldset className="drop-shadow-md" w={"100%"} maw={"350"}>
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={(values) => handleLogin(values)}
            >
              {({ handleSubmit, values, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <Stack gap={8}>
                    <Text fz={24} fw={500}>
                      Login
                    </Text>
                    <TextInput
                      placeholder="Username"
                      onChange={(e) =>
                        setFieldValue("username", e.target.value)
                      }
                      value={values.username}
                    />
                    <PasswordInput
                      placeholder="Password"
                      autoComplete="password"
                      onChange={(e) =>
                        setFieldValue("password", e.target.value)
                      }
                      value={values.password}
                    />
                    <Button mt={16} type="submit" color="green">
                      Sign In
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Fieldset>
        </Center>
      </Box>
    </>
  );
};

export default LoginPage;
