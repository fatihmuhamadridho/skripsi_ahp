import { Container, Group, Text, UnstyledButton } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import React from "react";
import { useSidebarContext } from "../Sidebar/Sidebar";

interface NavbarProps {
  title?: string;
  onExpand?: (e?: any) => void;
}

const Navbar = ({ title, onExpand }: NavbarProps) => {
  const { expand, setExpand } = useSidebarContext();

  return (
    <Container
      className="fixed text-white z-10"
      w={"100%"}
      h={50}
      fluid
      px={16}
      bg={"#3C8DBC"}
    >
      <Group h={"100%"} align="center">
        <UnstyledButton
          h={"100%"}
          px={0}
          onClick={() => (onExpand ? onExpand() : setExpand(!expand))}
        >
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
