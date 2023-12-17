import DefaultTemplate from "@/components/templates/Default/Default";
import {
  Button,
  Divider,
  Fieldset,
  NativeSelect,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import { MonthPickerInput } from "@mantine/dates";
import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import { Form, Formik } from "formik";
import { useGetAllCategoryKriteriaSubkriteria } from "@/services/categoryKriteriaService";

const TambahEntryNilaiAlternatif = () => {
  const { data: listCategoryKriteria } = useGetAllCategoryKriteriaSubkriteria();

  const renderNama = () => (
    <NativeSelect maw={400} required data={["1", "2", "3"]} />
  );

  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
      width: 30,
    },
    {
      label: "Nama",
      key: renderNama,
    },
    {
      label: "Absensi",
      key: renderNama,
    },
    {
      label: "Kerja Sama",
      key: renderNama,
    },
    {
      label: "Produktivitas",
      key: renderNama,
    },
  ];

  const data = [1, 2];

  return (
    <DefaultTemplate title="TambahEntryNilaiAlternatif">
      <Paper p={16}>
        <Formik
          initialValues={{}}
          onSubmit={(values: any) => console.log(values)}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack>
                <Stack gap={4}>
                  <Select
                    maw={400}
                    label="Pilih Kategori Kriteria"
                    data={listCategoryKriteria?.map((item: any) => {
                      return {
                        label: item.name,
                        value: String(item.category_kriteria_id),
                      };
                    })}
                    required
                  />
                </Stack>
                <Fieldset legend="Masukkan Nilai Evaluasi" disabled>
                  <Stack>
                    <DataTable
                      width={"calc(100vw - 230px - 32px - 32px - 32px)"}
                      mah={480}
                      header={listHeader}
                      data={data}
                    />
                    <Button>Tambah Data</Button>
                  </Stack>
                </Fieldset>
                <Divider />
                <Button w={"100%"} maw={200} variant="filled" color="teal">
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

export default TambahEntryNilaiAlternatif;
