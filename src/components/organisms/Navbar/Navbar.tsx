import {
  ActionIcon,
  Button,
  Container,
  Group,
  Indicator,
  Menu,
  Text,
} from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    router.push("/");
  };

  return (
    <Container
      className="fixed border-b z-50"
      py={4}
      w={"100%"}
      h={60}
      fluid
      bg={"#fff"}
    >
      <Group h={"100%"} align="center" justify="space-between">
        <Text
          className="cursor-pointer"
          fz={24}
          fw={700}
          onClick={() => router.push("/")}
        >
          Nextjs Boilerplate
        </Text>
        <Group>
          <ActionIcon variant="white" c={"dark"}>
            <Indicator position="bottom-end">
              <IconBell />
            </Indicator>
          </ActionIcon>
          <Menu width={120}>
            <Menu.Target>
              <Button variant="default">Admin</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Container>
  );
};

export default Navbar;
