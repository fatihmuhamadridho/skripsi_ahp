import {
  Accordion,
  Container,
  ScrollArea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
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
    title: "Children",
    children: [
      {
        title: "Dashboard",
        endpoint: "/",
      },
    ],
  },
];

const Sidebar = () => {
  const router = useRouter();
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
      className="fixed border-r"
      mx={0}
      pb={60}
      p={0}
      w={220}
      h={"100%"}
      mih={"calc(100vh - 60px)"}
      bg={"white"}
      fluid
    >
      <TextInput
        px={12}
        py={8}
        placeholder="Search page here.."
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
      <ScrollArea h={"calc(100vh - 110px)"}>
        {routesExpand && (
          <Accordion value={routesExpand} multiple>
            {listRoutes
              .filter((item) =>
                item.title.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((routes, routesIndex) => {
                if (routes.endpoint && !routes.children)
                  return (
                    <UnstyledButton
                      key={routesIndex}
                      style={{ borderBottom: "1px solid #dee2e6" }}
                      w={"100%"}
                      px={16}
                      py={12}
                      onClick={() => router.push(routes.endpoint!)}
                    >
                      {routes.title}
                    </UnstyledButton>
                  );

                return (
                  <Accordion.Item key={routesIndex} value={routes.title}>
                    <Accordion.Control
                      onClick={() => handleExpandMenu(routes.title)}
                    >
                      {routes.title}
                    </Accordion.Control>
                    {routes.children?.map((child, childIndex) => (
                      <Accordion.Panel
                        key={childIndex}
                        className="cursor-pointer"
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
