import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import DefaultTemplate from "@/components/templates/Default/Default";
import { useGetAllKriteria } from "@/services/kriteriaService";
import {
  Button,
  Divider,
  Fieldset,
  NativeSelect,
  NumberInput,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { Form, Formik } from "formik";
import React from "react";

const TambahEntryNilaiKriteria = () => {
  const { data: listKriteria }: { data: any[] } = useGetAllKriteria();

  const renderKriteria = () => (
    <NativeSelect
      maw={400}
      required
      data={listKriteria?.map((item) => {
        return {
          label: `${item.kriteria_id} - ${item.name}`,
          value: String(item.kriteria_id),
        };
      })}
    />
  );

  const renderBobotInput = () => <NumberInput />;

  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
    },
    {
      label: "Kriteria Dituju",
      key: renderKriteria,
    },
    {
      label: "Kriteria Pembanding",
      key: renderKriteria,
    },
    {
      label: "Bobot",
      key: renderBobotInput,
    },
  ];
  const data = [1];

  return (
    <DefaultTemplate title="TambahEntryNilaiKriteria">
      <Paper p={16}>
        <Formik
          initialValues={{
            periode: new Date(),
            name: "",
            total_kriteria: 1,
            BobotKriteria: [],
          }}
          onSubmit={(values: any) => console.log(values)}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack>
                <Stack gap={4}>
                  <MonthPickerInput
                    maw={400}
                    label="Pilih Bulan dan Tahun"
                    onChange={(e) => setFieldValue("periode", e)}
                    value={values.periode}
                    required
                  />
                  <TextInput
                    maw={400}
                    label="Nama Kategori"
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    value={values.name!}
                  />
                  <NumberInput
                    maw={400}
                    max={5}
                    label="Jumlah Kriteria yang Diambil"
                    onChange={(e) => setFieldValue("total_kriteria", e)}
                    value={values.total_kriteria!}
                  />
                </Stack>
                <Fieldset
                  legend="Masukkan Bobot Kriteria"
                  disabled={!values.periode || !values.name}
                >
                  <Stack>
                    <DataTable
                      width={"calc(100vw - 230px - 32px - 32px - 32px)"}
                      mah={480}
                      header={listHeader}
                      data={data}
                    />
                  </Stack>
                </Fieldset>
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

export default TambahEntryNilaiKriteria;
