import Navbar from "@/components/organisms/Navbar/Navbar";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";
import { Box, Container, Flex } from "@mantine/core";
import Head from "next/head";
import React from "react";

interface DefaultTemplateProps {
  title: string;
  children: React.ReactNode;
}

const DefaultTemplate = ({ title, children }: DefaultTemplateProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Flex direction={"row"}>
        <Sidebar />
        <Box w={"100%"} ml={230}>
          <Navbar />
          <Container mt={50} p={16} fluid>
            {children}
          </Container>
        </Box>
      </Flex>
    </>
  );
};

export default DefaultTemplate;
