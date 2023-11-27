import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import ModalDelete from "@/components/atoms/Modals/ModalDelete/ModalDelete";
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

const DataKaryawan = () => {
  const router = useRouter();

  const handleEdit = () => {
    router.push("/data/data-karyawan/edit-data-karyawan/1");
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
      label: "Nama Lengkap",
      key: "fullname",
    },
    {
      label: "Jenis Kelamin",
      key: "gender",
    },
    {
      label: "Tempat, Tanggal Lahir",
      key: "ttl",
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
  const data = [
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },

    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
    },
    {
      fullname: "Fatih Muhamad Ridho",
      gender: "laki-laki",
      ttl: "Tangerang, 03 Oktober 2001",
      handphone: "+6282110797472",
      address:
        "Jl. H. Djiran No 08 RT 003/RW 001, Kec. Pinang, Kel. Pinang, Kota Tangerang (15145)",
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

export default DataKaryawan;
