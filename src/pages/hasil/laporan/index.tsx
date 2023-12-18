import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
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
import React from "react";

const LaporanPage = () => {
  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
      width: 30,
    },
    {
      label: "Periode",
      key: "periode",
    },
  ];
  const data = [
    {
      periode: "Oktober 2023",
    },
    {
      periode: "November 2023",
    },
    {
      periode: "Desember 2023",
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
          <DataTable mah={480} header={listHeader} data={data} />
        </Stack>
      </Paper>
    </DefaultTemplate>
  );
};

export default LaporanPage;
