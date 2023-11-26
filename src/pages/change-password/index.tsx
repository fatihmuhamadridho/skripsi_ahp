import DefaultTemplate from "@/components/templates/Default/Default";
import {
  Box,
  Button,
  Divider,
  Paper,
  PasswordInput,
  Stack,
} from "@mantine/core";
import React from "react";

const ChangePasswordPage = () => {
  return (
    <DefaultTemplate title="ChangePasswordPage">
      <Paper p={16}>
        <Stack>
          <Stack gap={4}>
            <PasswordInput maw={400} label="Password Lama" required />
            <PasswordInput maw={400} label="Password Baru" required />
            <PasswordInput maw={400} label="Ulangi Password Baru" required />
          </Stack>
          <Divider />
          <Button w={"100%"} maw={200} variant="filled" color="teal">
            Submit
          </Button>
        </Stack>
      </Paper>
    </DefaultTemplate>
  );
};

export default ChangePasswordPage;
