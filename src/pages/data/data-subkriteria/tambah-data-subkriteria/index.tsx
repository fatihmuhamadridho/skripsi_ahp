import DefaultTemplate from "@/components/templates/Default/Default";
import { useGetAllKriteria } from "@/services/kriteriaService";
import { SubkriteriaService } from "@/services/subkriteriaService";
import {
  Button,
  Divider,
  NativeSelect,
  Paper,
  Select,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const TambahDataSubkriteria = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: listKriteria } = useGetAllKriteria();

  const handleTambahData = async (payload: any) => {
    try {
      const response = await SubkriteriaService.postSubkriteria(payload);
      if (response.status === 200) {
        await queryClient.invalidateQueries(["useGetAllSubkriteria"]);
        alert("Berhasil handleTambahData!");
        router.push("/data/data-subkriteria");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  console.log({ listKriteria });

  return (
    <DefaultTemplate title="TambahDataSubkriteria">
      <Paper p={16}>
        <Formik
          enableReinitialize
          initialValues={{ kriteriaKriteria_id: 0, name: "" }}
          onSubmit={(values: any) => handleTambahData(values)}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack>
                <Stack gap={4}>
                  <Select
                    maw={400}
                    label="Pilih Kriteria"
                    required
                    data={listKriteria?.map((kriteria: any) => {
                      return {
                        label: `${kriteria.kriteria_id} - ${kriteria.name}`,
                        value: String(kriteria.kriteria_id),
                      };
                    })}
                    onChange={(e) =>
                      setFieldValue("kriteriaKriteria_id", Number(e))
                    }
                    value={String(values.kriteriaKriteria_id)}
                  />
                  <TextInput
                    maw={400}
                    label="Nama Subkriteria"
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

export default TambahDataSubkriteria;
