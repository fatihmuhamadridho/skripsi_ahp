import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import ModalDelete from "@/components/atoms/Modals/ModalDelete/ModalDelete";
import DefaultTemplate from "@/components/templates/Default/Default";
import {
  SubkriteriaService,
  useGetAllSubkriteria,
} from "@/services/subkriteriaService";
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
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const DataSubkriteria = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: listSubkriteria }: { data: any[] } = useGetAllSubkriteria();

  const handleEdit = (subkriteria_id: number) => {
    router.push(
      "/data/data-subkriteria/edit-data-subkriteria" + `/${subkriteria_id}`
    );
  };

  const handleDeleteData = async (subkriteria_id: number) => {
    try {
      const response = await SubkriteriaService.deleteSubkriteria(
        subkriteria_id
      );
      if (response?.status === 200) {
        await queryClient.invalidateQueries(["useGetAllSubkriteria"]);
        alert("Berhasil handleDeleteData!");
        // router.push("/data/data-karyawan");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const renderKriteria = (values: any) => <Text>{values?.Kriteria?.name}</Text>;

  const renderAksi = (values: any) => (
    <Flex gap={12}>
      <Button color="green" onClick={() => handleEdit(values.subkriteria_id)}>
        Ubah
      </Button>
      <ModalDelete onClick={() => handleDeleteData(values.subkriteria_id)} />
    </Flex>
  );

  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
      width: 30,
    },
    {
      label: "Nama Alternatif",
      key: "name",
      width: 200,
    },
    {
      label: "Nama Kriteria",
      key: renderKriteria,
      width: 200,
    },
    {
      label: "Aksi",
      key: renderAksi,
      width: 200,
    },
  ];

  return (
    <DefaultTemplate title="DataSubkriteria">
      <Paper p={16}>
        <Stack>
          <Box>
            <Button
              variant="default"
              onClick={() =>
                router.push("/data/data-subkriteria/tambah-data-subkriteria")
              }
            >
              Tambah Data
            </Button>
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
            data={listSubkriteria}
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

export default DataSubkriteria;
