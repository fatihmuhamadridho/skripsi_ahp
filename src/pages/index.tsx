import DefaultTemplate from "@/components/templates/Default/Default";
import { Paper, Text } from "@mantine/core";
import React from "react";

const HomePage = () => {
  return (
    <DefaultTemplate title="HomePage">
      <Paper bg={"white"} py={12} px={24} radius={8}>
        <Text fz={24} fw={600}>
          Selamat Datang!
        </Text>
        <Text fz={16} fw={400}>
          Ini adalah aplikasi untuk memanajemen database
        </Text>
      </Paper>
    </DefaultTemplate>
  );
};

export default HomePage;
