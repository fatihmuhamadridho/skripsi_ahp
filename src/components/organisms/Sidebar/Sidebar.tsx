import {
  Accordion,
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Group,
  Indicator,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
  IconChartHistogram,
  IconDashboard,
  IconFileFilled,
  IconLogout2,
  IconPassword,
  IconPrinter,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface listRouterProps {
  title: string;
  endpoint?: string;
  icon?: any;
  children?: Array<{
    title: string;
    endpoint: string;
    icon?: any;
  }>;
}

const listRoutes: listRouterProps[] = [
  {
    title: "Dashboard",
    endpoint: "/",
    icon: <IconDashboard size={18} />,
  },
  {
    title: "Data",
    icon: <IconFileFilled size={18} />,
    children: [
      {
        title: "Data Kriteria",
        endpoint: "/data/data-kriteria",
      },
      {
        title: "Data Alternatif",
        endpoint: "/data/data-alternatif",
      },
    ],
  },
  {
    title: "Proses",
    icon: <IconChartHistogram size={18} />,
    children: [
      {
        title: "Entry Nilai Kriteria 2",
        endpoint: "/proses/entry-nilai-kriteria2",
      },
      {
        title: "Entry Nilai Alternatif",
        endpoint: "/proses/entry-nilai-alternatif",
      },
    ],
  },
  {
    title: "Hasil",
    icon: <IconPrinter size={18} />,
    children: [
      {
        title: "Ranking",
        endpoint: "/hasil/ranking",
      },
      {
        title: "Laporan",
        endpoint: "/hasil/laporan",
      },
    ],
  },
  {
    title: "divider",
  },
  {
    title: "Data Pengguna",
    endpoint: "/user",
    icon: <IconUsersGroup size={18} />,
  },
  {
    title: "Ubah Password",
    endpoint: "/change-password",
    icon: <IconPassword size={18} />,
  },
  {
    title: "Logout",
    endpoint: "/logout",
    icon: <IconLogout2 size={18} />,
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
      className="fixed text-white z-10"
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
                      bg={
                        router.pathname === routes.endpoint
                          ? "#2C3B41"
                          : "#222D32"
                      }
                      onClick={() => router.push(routes.endpoint!)}
                    >
                      <Flex gap={8} align={"center"}>
                        {routes.icon}
                        <Text fz={14}>{routes.title}</Text>
                      </Flex>
                    </UnstyledButton>
                  );

                if (routes.title === "divider")
                  return <Divider key={routesIndex} my={12} />;

                return (
                  <Accordion.Item key={routesIndex} value={routes.title}>
                    <Accordion.Control
                      className="!text-white"
                      bg={
                        routes.children &&
                        routes.children[0].endpoint.includes(
                          router.pathname.split("/")[1]
                        ) &&
                        router.pathname !== "/"
                          ? "#2C3B41"
                          : "#222D32"
                      }
                      px={8}
                      onClick={() => handleExpandMenu(routes.title)}
                    >
                      <Flex gap={8} align={"center"}>
                        {routes.icon}
                        <Text fz={14}>{routes.title}</Text>
                      </Flex>
                    </Accordion.Control>
                    {routes.children?.map((child, childIndex) => (
                      <Accordion.Panel
                        key={childIndex}
                        className="cursor-pointer !text-[14px]"
                        classNames={{ content: "!py-[10.5px]" }}
                        bg={
                          router.pathname === child.endpoint
                            ? "#2C3B41"
                            : "#222D32"
                        }
                        pl={16}
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
