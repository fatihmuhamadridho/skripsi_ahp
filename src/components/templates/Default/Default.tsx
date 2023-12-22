import Navbar from "@/components/organisms/Navbar/Navbar";
import Sidebar, {
  SidebarContext,
} from "@/components/organisms/Sidebar/Sidebar";
import { Box, Center, Container, Drawer, Flex, Loader } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Head from "next/head";
import React, { useState } from "react";

interface DefaultTemplateProps {
  title: string;
  children?: React.ReactNode;
}

const DefaultTemplate = ({ title, children }: DefaultTemplateProps) => {
  const [expand, setExpand] = useState<boolean>(true);
  const [expandMobile, setExpandMobile] = useState<boolean>(false);
  const matches = useMediaQuery("(min-width: 600px)");

  if (matches === undefined) {
    return (
      <Center h={"100vh"}>
        <Loader />
      </Center>
    );
  }

  return (
    <SidebarContext.Provider value={{ expand, setExpand }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Flex className="overflow-hidden" direction={"row"} h={"100%"}>
        {!matches && (
          <Drawer
            classNames={{
              body: "!p-0",
              inner: "!w-[230px]",
              content: "!bg-[#092635]",
            }}
            opened={expandMobile}
            onClose={() => {
              setExpandMobile(!expandMobile);
              setExpand(!expandMobile);
            }}
            withCloseButton={false}
          >
            <Sidebar />
          </Drawer>
        )}
        {matches && <Sidebar />}
        <Box
          className="transition-all duration-300"
          w={"100%"}
          ml={matches ? (expand ? 230 : 60) : 0}
        >
          <Navbar
            title={title}
            onExpand={
              !matches
                ? () => {
                    setExpandMobile(!expandMobile);
                    setExpand(!expandMobile);
                  }
                : undefined
            }
          />
          <Container mt={50} p={16} fluid>
            {children}
          </Container>
        </Box>
      </Flex>
    </SidebarContext.Provider>
  );
};

export default DefaultTemplate;
