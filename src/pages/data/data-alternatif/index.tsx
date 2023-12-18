import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import ModalDelete from "@/components/atoms/Modals/ModalDelete/ModalDelete";
import DefaultTemplate from "@/components/templates/Default/Default";
import {
  AlternatifService,
  useGetAllAlternatif,
} from "@/services/alternatifService";
import { useGetAllAttribute } from "@/services/attributeService";
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
  const { data: listAttribute }: { data: any[] } = useGetAllAttribute();
  const { data: listAlternatif } = useGetAllAlternatif();

  const handleEdit = (alternatif_id: number) => {
    router.push(
      "/data/data-alternatif/edit-data-alternatif" + `/${alternatif_id}`
    );
  };

  const handleDeleteData = async (alternatif_id: number) => {
    try {
      const response = await AlternatifService.deleteAlternatif(alternatif_id);
      if (response?.status === 200) {
        await queryClient.invalidateQueries(["useGetAllAlternatif"]);
        alert("Berhasil handleDeleteData!");
      }
    } catch (error: any) {
      alert(error.stack);
    }
  };

  const renderAksi = (values: any) => {
    return (
      <Flex gap={12}>
        <Button color="green" onClick={() => handleEdit(values.alternatif_id)}>
          Ubah
        </Button>
        <ModalDelete onClick={() => handleDeleteData(values.alternatif_id)} />
      </Flex>
    );
  };

  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
      width: 30,
    },
  ];
  const listHeader2: tableHeadersProps[] = [
    {
      label: "Aksi",
      key: renderAksi,
      width: 200,
    },
  ];
  const listHeader3: tableHeadersProps[] = listHeader
    ?.concat(
      listAttribute?.map((item: any) => {
        return {
          label: item?.label,
          key: item?.key,
          width: 220,
        };
      })
    )
    ?.concat(listHeader2);

  return (
    <DefaultTemplate title="DataAlternatif">
      <Paper p={16}>
        <Stack>
          <Box>
            <Button
              variant="default"
              onClick={() =>
                router.push("/data/data-alternatif/tambah-data-alternatif")
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
          <DataTable
            mah={480}
            header={listAttribute ? listHeader3 : []}
            data={listAlternatif?.map((item: any) => {
              return {
                alternatif_id: item.alternatif_id,
                ...item?.dataJson,
              };
            })}
          />
        </Stack>
      </Paper>
    </DefaultTemplate>
  );
};

export default DataAlternatif;
