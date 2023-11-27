import DefaultTemplate from "@/components/templates/Default/Default";
import {
  Button,
  Divider,
  Fieldset,
  NativeSelect,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import { MonthPickerInput } from "@mantine/dates";
import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";

const TambahEntryNilaiAlternatif = () => {
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

  const data = [1, 2, 3];

  return (
    <DefaultTemplate title="TambahEntryNilaiAlternatif">
      <Paper p={16}>
        <Stack>
          <Stack gap={4}>
            <MonthPickerInput
              maw={400}
              label="Pilih Bulan dan Tahun"
              required
            />
            <NativeSelect
              maw={400}
              label="Pilih Kategori Nilai Kriteria"
              required
              disabled
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
      </Paper>
    </DefaultTemplate>
  );
};

export default TambahEntryNilaiAlternatif;
