import DefaultTemplate from "@/components/templates/Default/Default";
import { KriteriaService, useGetOneKriteria } from "@/services/kriteriaService";
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

const EditDataKriteria = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { kriteria_id }: { [key: string]: any } = router.query;
  const { data: detailKriteria } = useGetOneKriteria(kriteria_id!);

  const handleEditData = async (payload: any) => {
    try {
      const response = await KriteriaService.putKriteria(payload, kriteria_id);
      if (response?.status === 200) {
        await queryClient.invalidateQueries(["useGetAllKriteria"]);
        alert("Berhasil handleEditData!");
        router.push("/data/data-kriteria");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  return (
    <DefaultTemplate title="EditDataKriteria">
      <Paper p={16}>
        <Formik
          enableReinitialize
          initialValues={{ name: detailKriteria?.name || "" }}
          onSubmit={(values: any) => handleEditData(values)}
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

export default EditDataKriteria;
