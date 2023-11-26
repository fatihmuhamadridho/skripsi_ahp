import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import DefaultTemplate from "@/components/templates/Default/Default";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  NativeSelect,
  Pagination,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

const DataAlternatif = () => {
  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
      width: 30,
    },
    {
      label: "Nama Alternatif",
      key: "name",
    },
    {
      label: "Nama Kriteria",
      key: "kriteria_name",
    },
  ];
  const data = [
    {
      name: "<15 hari",
      kriteria_name: "Absensi",
    },
    {
      name: "15-20 hari",
      kriteria_name: "Absensi",
    },
    {
      name: ">20 hari",
      kriteria_name: "Absensi",
    },
  ];

  return (
    <DefaultTemplate title="DataAlternatif">
      <Paper p={16}>
        <Stack>
          <Box>
            <Button variant="default">Tambah Data</Button>
          </Box>
          <Divider />
          <Group justify="space-between">
            <Group>
              <Flex align={"center"} gap={12}>
                <Text fz={12}>Cari :</Text>
                <TextInput
                  rightSection={<IconSearch size={18} />}
                  placeholder="Cari"
                />
              </Flex>
              <Flex align={"center"} gap={12}>
                <Text fz={12}>Kriteria :</Text>
                <Select
                  data={["Absensi", "Bekerja Sama", "Produktivitas"]}
                  placeholder="Kriteria"
                />
              </Flex>
            </Group>

            <Flex align={"center"} gap={12}>
              <Text fz={12}>Data per halaman</Text>
              <NativeSelect data={["1", "2", "3"]} />
            </Flex>
          </Group>
          <DataTable
            width={"calc(100vw - 230px - 32px - 32px)"}
            mah={480}
            header={listHeader}
            data={data}
          />
          <Group align="center" justify="space-between">
            <Text fz={12}>Menampilkan 1 s/d 3 dari 3 data</Text>
            <Pagination size={"sm"} total={10} />
          </Group>
        </Stack>
      </Paper>
    </DefaultTemplate>
  );
};

export default DataAlternatif;
