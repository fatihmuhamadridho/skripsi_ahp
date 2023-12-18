import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import ModalDelete from "@/components/atoms/Modals/ModalDelete/ModalDelete";
import DefaultTemplate from "@/components/templates/Default/Default";
import { KriteriaService, useGetAllKriteria } from "@/services/kriteriaService";
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
import { useQueryClient } from "react-query";

const DataAlternatif = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: listKriteria }: { data: any[] } = useGetAllKriteria();

  const handleEdit = (kriteria_id: number) => {
    router.push("/data/data-kriteria/edit-data-kriteria" + `/${kriteria_id}`);
  };

  const handleDeleteData = async (kriteria_id: number) => {
    try {
      const response = await KriteriaService.deleteKriteria(kriteria_id);
      if (response?.status === 200) {
        await queryClient.invalidateQueries(["useGetAllKriteria"]);
        alert("Berhasil handleDeleteData!");
        // router.push("/data/data-karyawan");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const renderAksi = (values: any) => (
    <Flex gap={12}>
      <Button color="green" onClick={() => handleEdit(values.kriteria_id)}>
        Ubah
      </Button>
      <ModalDelete onClick={() => handleDeleteData(values.kriteria_id)} />
    </Flex>
  );

  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
      width: 30,
    },
    {
      label: "Nama Kriteria",
      key: "name",
      width: 250,
    },
    {
      label: "Aksi",
      key: renderAksi,
      width: 200,
    },
  ];

  return (
    <DefaultTemplate title="DataAlternatif">
      <Paper p={16}>
        <Stack>
          <Box>
            <Button
              variant="default"
              onClick={() =>
                router.push("/data/data-kriteria/tambah-data-kriteria")
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

            <Flex align={"center"} gap={12}>
              <Text fz={12}>Data per halaman</Text>
              <NativeSelect data={["1", "2", "3"]} />
            </Flex>
          </Group>
          <DataTable mah={480} header={listHeader} data={listKriteria} />
        </Stack>
      </Paper>
    </DefaultTemplate>
  );
};

export default DataAlternatif;
