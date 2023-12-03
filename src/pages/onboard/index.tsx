import {
  Button,
  Center,
  Container,
  Fieldset,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { Form, Formik } from "formik";

const OnBoardPage = () => {
  const router = useRouter();

  const handleLogin = async (values: any) => {
    try {
      router.push("/");
    } catch (error: any) {
      alert("Gagal Login!");
    }
  };

  return (
    <Container>
      <Center mih={"85vh"}>
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
                  <TextInput label="Username" />
                  <PasswordInput autoComplete="on" label="Password" />
                  <Button mt={16} type="submit" color="green">
                    Sign In
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Fieldset>
      </Center>
    </Container>
  );
};

export default OnBoardPage;
