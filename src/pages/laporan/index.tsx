import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import ModalDelete from "@/components/atoms/Modals/ModalDelete/ModalDelete";
import DefaultTemplate from "@/components/templates/Default/Default";
import {
  AnalisaKriteriaService,
  useGetAllAnalisaKriteria,
} from "@/services/analisaKriteriaService";
import { KriteriaService, useGetAllKriteria } from "@/services/kriteriaService";
import {
  Badge,
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
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const LaporanPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: listAnalisaKriteria } = useGetAllAnalisaKriteria();

  const renderAksi = (values: any) => (
    <Flex gap={12}>
      <Button
        color="green"
        rightSection={<IconArrowRight />}
        component="a"
        href={"/laporan/" + values.kategori_id}
        target="_blank"
      >
        Pilih
      </Button>
    </Flex>
  );

  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
      width: 30,
    },
    {
      label: "Nama Kategori Kriteria",
      key: "name",
      width: 200,
    },
    {
      label: "Periode",
      key: "periode",
      width: 200,
    },
    {
      label: "Aksi",
      key: renderAksi,
      width: 200,
    },
  ];

  return (
    <DefaultTemplate title="LaporanPage">
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
          </Group>
          <DataTable mah={480} header={listHeader} data={listAnalisaKriteria} />
        </Stack>
      </Paper>
    </DefaultTemplate>
  );
};

export default LaporanPage;
