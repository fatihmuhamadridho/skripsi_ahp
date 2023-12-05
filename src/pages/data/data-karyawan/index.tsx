import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import ModalDelete from "@/components/atoms/Modals/ModalDelete/ModalDelete";
import DefaultTemplate from "@/components/templates/Default/Default";
import { KaryawanService, useGetAllKaryawan } from "@/services/karyawanService";
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

const DataKaryawan = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: listKaryawan }: { data: any[] } = useGetAllKaryawan();

  const handleEdit = (karyawan_id: number) => {
    router.push("/data/data-karyawan/edit-data-karyawan" + `/${karyawan_id}`);
  };

  const handleDeleteData = async (karyawan_id: number) => {
    try {
      const response = await KaryawanService.deleteKaryawan(karyawan_id);
      if (response?.status === 200) {
        await queryClient.invalidateQueries(["useGetAllKaryawan"]);
        alert("Berhasil handleDeleteData!");
        // router.push("/data/data-karyawan");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const renderTTL = (values: any) => (
    <Text>
      {values.birth_place} + {String(values?.birth_date)}
    </Text>
  );

  const renderAksi = (values: any) => (
    <Flex gap={12}>
      <Button color="green" onClick={() => handleEdit(values.karyawan_id)}>
        Ubah
      </Button>
      <ModalDelete onClick={() => handleDeleteData(values.karyawan_id)} />
    </Flex>
  );

  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
      width: 30,
    },
    {
      label: "Nama Lengkap",
      key: "fullname",
    },
    {
      label: "Jenis Kelamin",
      key: "gender",
    },
    {
      label: "Tempat, Tanggal Lahir",
      key: renderTTL,
    },
    {
      label: "No. Telp",
      key: "handphone",
      width: 150,
    },
    {
      label: "Alamat",
      key: "address",
      width: 200,
    },
    {
      label: "Aksi",
      key: renderAksi,
      width: 200,
    },
  ];

  return (
    <DefaultTemplate title="DataKaryawan">
      <Paper p={16}>
        <Stack>
          <Box>
            <Button
              variant="default"
              onClick={() =>
                router.push("/data/data-karyawan/tambah-data-karyawan")
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
          <DataTable
            width={"calc(100vw - 230px - 32px - 32px)"}
            mah={480}
            header={listHeader}
            data={listKaryawan}
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

export default DataKaryawan;
