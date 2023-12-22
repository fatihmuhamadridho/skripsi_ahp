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
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const RankingPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: listAnalisaKriteria } = useGetAllAnalisaKriteria();

  const renderKriteria = (values: any) => (
    <Group gap={8}>
      {values.KategoriKriteria.map((item: any, index: number) => (
        <Badge key={index}>{item.Kriteria.name}</Badge>
      ))}
    </Group>
  );

  const renderCR = (values: any) => {
    const crPercentage = values?.RankingPage?.cr * 100;
    return (
      <Text c={isNaN(crPercentage) || crPercentage > 10 ? "red" : "green"}>
        {String(crPercentage).slice(0, 4)} %
      </Text>
    );
  };

  const renderAksi = (values: any) => (
    <Flex gap={12}>
      <Button color="green" onClick={() => handleEditData(values.kategori_id)}>
        Ubah
      </Button>
      <ModalDelete onClick={() => handleDeleteData(values.kategori_id)} />
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
      label: "Kriteria",
      key: renderKriteria,
      width: 200,
    },
    {
      label: "CR",
      key: renderCR,
    },
    {
      label: "Aksi",
      key: renderAksi,
      width: 200,
    },
  ];

  const handleEditData = (kategori_id: number) => {
    router.push(
      "/proses/analisa-kriteria/edit-analisa-kriteria" + `/${kategori_id}`
    );
  };

  const handleDeleteData = async (kategori_id: number) => {
    try {
      const response = await AnalisaKriteriaService.deleteAnalisaKriteria(
        kategori_id
      );
      if (response?.status === 200) {
        await queryClient.invalidateQueries(["useGetAllAnalisaKriteria"]);
        alert("Berhasil handleDeleteData!");
        // router.push("/data/data-karyawan");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  return (
    <DefaultTemplate title="RankingPage">
      <Paper p={16}>
        <Stack>
          <Box>
            <Button
              variant="default"
              onClick={() =>
                router.push("/proses/analisa-kriteria/tambah-analisa-kriteria")
              }
            >
              Tambah Data
            </Button>
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
          </Group>
          <DataTable mah={480} header={listHeader} data={listAnalisaKriteria} />
        </Stack>
      </Paper>
    </DefaultTemplate>
  );
};

export default RankingPage;
