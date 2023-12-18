import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import DefaultTemplate from "@/components/templates/Default/Default";
import { useGetAllUser } from "@/services/userService";
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
import React from "react";
import { useRouter } from "next/router";
import ModalDelete from "@/components/atoms/Modals/ModalDelete/ModalDelete";

const UserPage = () => {
  const router = useRouter();
  const { data: listUser } = useGetAllUser();

  const handleAdd = () => {
    router.push("/user/tambah-user");
  };

  const handleEdit = () => {
    router.push("/user/edit-user/1");
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
    },
    {
      label: "Nama Lengkap",
      key: "fullname",
    },
    {
      label: "Username",
      key: "username",
    },
    {
      label: "Aksi",
      key: renderAksi,
    },
  ];

  return (
    <DefaultTemplate title="UserPage">
      <Paper p={16}>
        <Stack>
          <Box>
            <Button variant="default" onClick={handleAdd}>
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
          <DataTable mah={480} header={listHeader} data={listUser} />
          <Group align="center" justify="space-between">
            <Text fz={12}>Menampilkan 1 s/d 3 dari 3 data</Text>
            <Pagination size={"sm"} total={10} />
          </Group>
        </Stack>
      </Paper>
    </DefaultTemplate>
  );
};

export default UserPage;
