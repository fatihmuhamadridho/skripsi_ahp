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

const AnalisaAlternatif = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: listKriteria }: { data: any[] } = useGetAllKriteria();
  const { data: listAnalisaKriteria } = useGetAllAnalisaKriteria();

  const renderAlternatif = (values: any) => (
    <Group gap={8}>
      {values.AnalisaAlternatif.map((item: any, index: number) => (
        <Badge key={index}>{item.Alternatif.dataJson.fullname}</Badge>
      ))}
    </Group>
  );

  const renderTotalAlternatif = (values: any) => {
    return <Text>{values.AnalisaAlternatif.length}</Text>;
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
      label: "Alternatif",
      key: renderAlternatif,
      width: 200,
    },
    {
      label: "Jumlah Alternatif",
      key: renderTotalAlternatif,
      width: 200,
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
    <DefaultTemplate title="AnalisaAlternatif">
      <Paper p={16}>
        <Stack>
          <Box>
            <Button
              variant="default"
              onClick={() =>
                router.push(
                  "/proses/analisa-alternatif/tambah-analisa-alternatif"
                )
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

export default AnalisaAlternatif;
