import DefaultTemplate from "@/components/templates/Default/Default";
import { KriteriaService } from "@/services/kriteriaService";
import {
  Button,
  Divider,
  Paper,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const TambahDataKriteria = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleTambahData = async (payload: any) => {
    try {
      const response = await KriteriaService.postKriteria(payload);
      if (response.status === 200) {
        await queryClient.invalidateQueries(["useGetAllKriteria"]);
        alert("Berhasil handleTambahData!");
        router.push("/data/data-kriteria");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  return (
    <DefaultTemplate title="TambahDataKriteria">
      <Paper p={16}>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values: any) => handleTambahData(values)}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack>
                <Stack gap={4}>
                  <TextInput
                    maw={400}
                    label="Nama Kriteria"
                    required
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    value={values.name}
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

export default TambahDataKriteria;
