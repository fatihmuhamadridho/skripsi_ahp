import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import ModalDelete from "@/components/atoms/Modals/ModalDelete/ModalDelete";
import DefaultTemplate from "@/components/templates/Default/Default";
import { useGetAllSubkriteria } from "@/services/subkriteriaService";
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
import { SubkriteriaProps } from "../../../../server/controllers/subkriteria.controller";

const DataSubkriteria = () => {
  const router = useRouter();
  const { data: listSubkriteria }: { data: SubkriteriaProps[] } =
    useGetAllSubkriteria();

  const handleEdit = () => {
    router.push("/data/data-subkriteria/edit-data-subkriteria/1");
  };

  const renderAksi = () => (
    <Flex gap={12}>
      <Button color="green" onClick={handleEdit}>
        Ubah
      </Button>
      <ModalDelete onClick={() => console.log("test")} />
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
      key: "kriteria_name",
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
