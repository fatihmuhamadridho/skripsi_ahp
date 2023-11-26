import { Container, Group, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons-react";
import React from "react";

interface NavbarProps {
  title?: string;
}

const Navbar = ({ title }: NavbarProps) => {
  const [, { toggle }] = useDisclosure();

  return (
    <Container
      className="fixed text-white"
      w={"100%"}
      h={50}
      fluid
      px={16}
      bg={"#3C8DBC"}
    >
      <Group h={"100%"} align="center">
        <UnstyledButton h={"100%"} px={0} onClick={toggle}>
          <IconMenu2 />
        </UnstyledButton>
        <Text fz={24} fw={500}>
          {title}
        </Text>
      </Group>
    </Container>
  );
};

export default Navbar;
