import DefaultTemplate from "@/components/templates/Default/Default";
import { KaryawanService } from "@/services/karyawanService";
import {
  Button,
  Divider,
  Paper,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const TambahDataKaryawan = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleTambahData = async (payload: any) => {
    try {
      const response = await KaryawanService.postKaryawan(payload);
      if (response.status === 200) {
        await queryClient.invalidateQueries(["useGetAllKaryawan"]);
        alert("Berhasil handleTambahData!");
        router.push("/data/data-karyawan");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  return (
    <DefaultTemplate title="TambahDataKaryawan">
      <Paper p={16}>
        <Formik
          initialValues={{
            fullname: "",
            gender: "",
            birth_place: "",
            birth_date: new Date(),
            handphone: "",
            address: "",
            position: "",
          }}
          onSubmit={(values: any) => handleTambahData(values)}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack>
                <Stack gap={4}>
                  <TextInput
                    maw={400}
                    label="Nama Lengkap"
                    required
                    onChange={(e) => setFieldValue("fullname", e.target.value)}
                    value={values.fullname}
                  />
                  <TextInput
                    maw={400}
                    label="Jenis Kelamin"
                    required
                    onChange={(e) => setFieldValue("gender", e.target.value)}
                    value={values.gender}
                  />
                  <TextInput
                    maw={400}
                    label="Kota Lahir"
                    required
                    onChange={(e) =>
                      setFieldValue("birth_place", e.target.value)
                    }
                    value={values.birth_place}
                  />
                  <DatePickerInput
                    maw={400}
                    label="Tanggal Lahir"
                    required
                    onChange={(e) => setFieldValue("birth_date", e)}
                    value={values.birth_date}
                  />
                  <TextInput
                    maw={400}
                    label="No Telp"
                    required
                    onChange={(e) => setFieldValue("handphone", e.target.value)}
                    value={values.handphone}
                  />
                  <Textarea
                    maw={400}
                    label="Alamat"
                    required
                    onChange={(e) => setFieldValue("address", e.target.value)}
                    value={values.address}
                  />
                  <TextInput
                    maw={400}
                    label="Jabatan"
                    required
                    onChange={(e) => setFieldValue("position", e.target.value)}
                    value={values.position}
                  />
                </Stack>
                <Divider />
                <Button
                  type="submit"
                  w={"100%"}
                  maw={200}
                  variant="filled"
                  color="teal"
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </DefaultTemplate>
  );
};

export default TambahDataKaryawan;
