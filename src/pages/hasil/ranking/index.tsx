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
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import React from "react";

const RankingPage = () => {
  const router = useRouter();

  const handleDetail = () => {
    router.push("/hasil/ranking/1");
  };

  const renderAksi = () => (
    <Button color="green" onClick={handleDetail}>
      Lihat Hasil
    </Button>
  );

  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
      width: 30,
    },
    {
      label: "Periode",
      key: "periode",
      width: 200,
    },
    {
      label: "Kategori Kriteria",
      key: "periode",
      width: 200,
    },
    {
      label: "Aksi",
      key: renderAksi,
      width: 150,
    },
  ];
  const data = [
    {
      periode: "Oktober 2023",
    },
    {
      periode: "November 2023",
    },
    {
      periode: "Desember 2023",
    },
  ];

  return (
    <DefaultTemplate title="RankingPage">
      <Paper p={16}>
        <Stack>
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

export default RankingPage;
