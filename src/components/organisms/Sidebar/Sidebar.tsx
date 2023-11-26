import {
  Accordion,
  Avatar,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  Indicator,
  ScrollArea,
  Text,
  TextInput,
  Transition,
  UnstyledButton,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface listRouterProps {
  title: string;
  endpoint?: string;
  children?: Array<{
    title: string;
    endpoint: string;
  }>;
}

const listRoutes: listRouterProps[] = [
  {
    title: "Dashboard",
    endpoint: "/",
  },
  {
    title: "Data",
    children: [
      {
        title: "Data Karyawan",
        endpoint: "/",
      },
      {
        title: "Data Kriteri",
        endpoint: "/",
      },
      {
        title: "Data Alternatif",
        endpoint: "/",
      },
    ],
  },
  {
    title: "Proses",
    children: [
      {
        title: "Analisa Kriteria",
        endpoint: "/",
      },
      {
        title: "Analisa Alternatif",
        endpoint: "/",
      },
      {
        title: "Entry Nilai Evaluasi",
        endpoint: "/",
      },
    ],
  },
  {
    title: "Hasil",
    children: [
      {
        title: "Ranking",
        endpoint: "/",
      },
      {
        title: "Laporan",
        endpoint: "/",
      },
    ],
  },
  {
    title: "divider",
  },
  {
    title: "Data Pengguna",
    endpoint: "/",
  },
  {
    title: "Ubah Password",
    endpoint: "/",
  },
  {
    title: "Logout",
    endpoint: "/",
  },
];

const Sidebar = () => {
  const router = useRouter();
  const { height, width } = useViewportSize();
  const [searchInput, setSearchInput] = useState<string>("");
  const [routesExpand, setRoutesExpand] = useState<string[] | undefined>(
    undefined
  );

  useEffect(() => {
    const listSideMenu = listRoutes.map((routes) => {
      return routes.title;
    });
    const sidemenu_active = localStorage.getItem("sidemenu_active");
    if (sidemenu_active) setRoutesExpand(JSON.parse(sidemenu_active));
    if (!sidemenu_active) {
      localStorage.setItem("sidemenu_active", JSON.stringify(listSideMenu));
      setRoutesExpand(listSideMenu);
    }
  }, []);

  const handleExpandMenu = (menu_name: string) => {
    const isMenuExpand = routesExpand?.findIndex(
      (routes) => routes === menu_name
    );
    if (isMenuExpand! < 0) {
      const addMenu = routesExpand?.concat([menu_name]);
      localStorage.setItem("sidemenu_active", JSON.stringify(addMenu));
      setRoutesExpand(addMenu);
    }
    if (isMenuExpand! >= 0) {
      const deleteMenu = routesExpand?.filter((routes) => routes !== menu_name);
      localStorage.setItem("sidemenu_active", JSON.stringify(deleteMenu));
      setRoutesExpand(deleteMenu);
    }
  };

  return (
    <Container
      className="fixed text-white"
      mx={0}
      pb={60}
      p={0}
      w={230}
      h={"100%"}
      mih={"calc(100vh - 60px)"}
      bg={"#222D32"}
      fluid
    >
      <UnstyledButton
        className="flex items-center justify-center"
        w={"100%"}
        h={50}
        component={Link}
        href={"/"}
        bg={"#377FA9"}
      >
        <Text fz={24} fw={700}>
          PT BNG
        </Text>
      </UnstyledButton>
      <Group px={12} h={65}>
        <Avatar size={45} />
        <Box>
          <Text fz={14} lh={"xs"}>
            Administrator
          </Text>
          <Flex ml={4}>
            <Indicator size={8} position="middle-start" color="green" />
            <Text fz={14} ml={10} lh={"xs"}>
              Online
            </Text>
          </Flex>
        </Box>
      </Group>
      <ScrollArea h={"calc(100vh - 50px - 65px)"} px={12}>
        {routesExpand && (
          <Accordion value={routesExpand} multiple variant="filled">
            {listRoutes
              .filter((item) =>
                item.title.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((routes, routesIndex) => {
                if (routes.endpoint && !routes.children)
                  return (
                    <UnstyledButton
                      className="!text-[14px]"
                      key={routesIndex}
                      w={"100%"}
                      px={8}
                      py={12}
                      onClick={() => router.push(routes.endpoint!)}
                    >
                      {routes.title}
                    </UnstyledButton>
                  );

                if (routes.title === "divider") return <Divider my={12} />;

                return (
                  <Accordion.Item key={routesIndex} value={routes.title}>
                    <Accordion.Control
                      className="!text-white !text-[14px]"
                      bg={"#222D32"}
                      px={8}
                      onClick={() => handleExpandMenu(routes.title)}
                    >
                      {routes.title}
                    </Accordion.Control>
                    {routes.children?.map((child, childIndex) => (
                      <Accordion.Panel
                        key={childIndex}
                        className="cursor-pointer !text-[14px]"
                        bg={"#222D32"}
                        pl={4}
                        onClick={() => router.push(child.endpoint)}
                      >
                        {child.title}
                      </Accordion.Panel>
                    ))}
                  </Accordion.Item>
                );
              })}
          </Accordion>
        )}
      </ScrollArea>
    </Container>
  );
};

export default Sidebar;
