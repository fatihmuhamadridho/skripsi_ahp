import DefaultTemplate from "@/components/templates/Default/Default";
import { Group, Paper, Stack, Text } from "@mantine/core";
import {
  IconBook,
  IconBook2,
  IconBuildingBank,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import React from "react";

interface CardTotalProps {
  title: string;
  total?: number;
  icon?: any;
  miw?: number;
  bg?: string;
}

const CardTotal = ({ title, total = 0, icon, miw, bg }: CardTotalProps) => (
  <Paper
    className="text-white"
    p={24}
    miw={miw || 240}
    radius={16}
    bg={bg || "#FF3543"}
  >
    <Stack gap={12}>
      <Group align="center" justify="center">
        {icon || <IconUsersGroup stroke={1.5} size={80} />}
        <Text fz={48} fw={500}>
          {total}
        </Text>
      </Group>
      <Text fz={18} fw={500} ta={"center"}>
        {title}
      </Text>
    </Stack>
  </Paper>
);

const HomePage = () => {
  return (
    <DefaultTemplate title="HomePage">
      <Stack>
        <Paper bg={"white"} py={12} px={24} radius={8}>
          <Text fz={24} fw={600}>
            Selamat Datang!
          </Text>
          <Text fz={16} fw={400} ta={"justify"}>
            Ini adalah aplikasi untuk tugas akhir implementasi Algoritma
            Analytical Hierarchy Process (AHP)
          </Text>
        </Paper>
        <Group>
          <CardTotal
            title="Jumlah Kriteria"
            total={0}
            icon={<IconBuildingBank stroke={1.5} size={80} />}
            bg="#FF3543"
          />
          <CardTotal
            title="Jumlah Alternatif"
            total={0}
            icon={<IconBook2 stroke={1.5} size={80} />}
            bg="#FFB000"
          />
          <CardTotal
            title="Jumlah User"
            total={0}
            icon={<IconUser stroke={1.5} size={80} />}
            bg="#27A1FF"
          />
        </Group>
      </Stack>
    </DefaultTemplate>
  );
};

export default HomePage;
