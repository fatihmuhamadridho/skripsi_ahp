import DefaultTemplate from "@/components/templates/Default/Default";
import {
  Box,
  Button,
  Divider,
  Fieldset,
  Flex,
  Group,
  NativeSelect,
  Pagination,
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
import { IconChevronLeft, IconSearch } from "@tabler/icons-react";
import ModalDelete from "@/components/atoms/Modals/ModalDelete/ModalDelete";
import { useRouter } from "next/router";

const DetailRanking = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const listHeader: tableHeadersProps[] = [
    {
      label: "Ranking",
      key: "index",
      width: 30,
    },
    {
      label: "Nama",
      key: "index",
    },
    {
      label: "Absensi",
      key: "index",
    },
    {
      label: "Kerja Sama",
      key: "index",
    },
    {
      label: "Produktivitas",
      key: "index",
    },
    {
      label: "Total",
      key: "index",
    },
  ];

  const data = [1, 2, 3];

  return (
    <DefaultTemplate title="DetailRanking">
      <Paper p={16}>
        <Stack>
          <Group justify="space-between">
            <Button
              color="gray"
              leftSection={<IconChevronLeft />}
              onClick={handleBack}
            >
              Kembali
            </Button>
            <Group>
              <Button color="green">Ubah</Button>
              <ModalDelete onClick={() => console.log("test")} />
            </Group>
          </Group>
          <Divider />
          <Box>
            <Text>Periode : Oktober 2023</Text>
            <Text>Kategory Kriteria : Karyawan Terbaik Oktober 2023</Text>
          </Box>
          <Divider />
          <Group justify="space-between">
            <Flex align={"center"} gap={12}>
              <Text fz={12}>Cari :</Text>
              <TextInput
                rightSection={<IconSearch size={18} />}
                placeholder="Cari"
              />
            </Flex>

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

export default DetailRanking;
