import DefaultTemplate from "@/components/templates/Default/Default";
import {
  Button,
  Divider,
  Paper,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import React from "react";

const EditDataKaryawan = () => {
  return (
    <DefaultTemplate title="EditDataKaryawan">
      <Paper p={16}>
        <Stack>
          <Stack gap={4}>
            <TextInput maw={400} label="Nama Lengkap" required />
            <TextInput maw={400} label="Jenis Kelamin" required />
            <TextInput maw={400} label="Kota Lahir" required />
            <TextInput maw={400} label="Tanggal Lahir" required />
            <TextInput maw={400} label="No Telp" required />
            <Textarea maw={400} label="Alamat" required />
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

export default EditDataKaryawan;
