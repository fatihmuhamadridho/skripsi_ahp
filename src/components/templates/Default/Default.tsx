import Navbar from "@/components/organisms/Navbar/Navbar";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";
import { Container, Flex } from "@mantine/core";
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
      <Container className="overflow-x-hidden" fluid p={0}>
        <Navbar />
        <Flex mt={60} direction={"row"}>
          <Sidebar />
          <Container w={"100%"} ml={220} fluid p={12} pb={32} mx={0}>
            {children}
          </Container>
        </Flex>
      </Container>
    </>
  );
};

export default DefaultTemplate;
