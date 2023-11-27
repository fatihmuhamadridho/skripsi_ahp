import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import DefaultTemplate from "@/components/templates/Default/Default";
import {
  Button,
  Divider,
  Fieldset,
  NativeSelect,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import React from "react";

const TambahEntryNilaiKriteria = () => {
  const renderNama = () => (
    <NativeSelect maw={400} required data={["1", "2", "3"]} />
  );

  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
    },
    {
      label: "Kriteria",
      key: renderNama,
    },
    {
      label: "Bobot",
      key: renderNama,
    },
  ];
  const data = [1, 2, 3];
  return (
    <DefaultTemplate title="TambahEntryNilaiKriteria">
      <Paper p={16}>
        <Stack>
          <Stack gap={4}>
            <MonthPickerInput
              maw={400}
              label="Pilih Bulan dan Tahun"
              required
            />
            <TextInput maw={400} label="Nama Kategori" />
          </Stack>
          <Fieldset legend="Masukkan Bobot Kriteria" disabled>
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
      </Paper>
    </DefaultTemplate>
  );
};

export default TambahEntryNilaiKriteria;
