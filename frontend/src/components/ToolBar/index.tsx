import React from "react";
import { Link, useLocation } from "react-router-dom";
import { VStack, Flex } from "@chakra-ui/react";
import { THEME_COLORS } from "../../util";
import { ArrowBackIcon, ChatIcon, InfoIcon } from "@chakra-ui/icons";

interface NavLink {
  link: string;
  icon: React.ReactNode;
}

export function ToolBar() {
  const location = useLocation();

  // Check if the current pathname is '/about'
  let navLinks: NavLink[];
  const isOnAboutPage = location.pathname === "/about";
  if (isOnAboutPage) {
    navLinks = [
      {
        link: "/",
        icon: <ArrowBackIcon />,
      },
    ];
  } else {
    navLinks = [
      {
        link: "/chat",
        icon: <ChatIcon />,
      },
      {
        link: "/about",
        icon: <InfoIcon />,
      },
    ];
  }
  return (
    <VStack position="fixed" top="20px" left="20px" zIndex="100" spacing="20px">
      {navLinks.map((link) => (
        <Link to={link.link}>
          <Flex
            w="50px"
            h="50px"
            borderRadius="50%"
            alignItems={"center"}
            justifyContent={"center"}
            backgroundColor="white"
            boxShadow={`0 2px 4px ${THEME_COLORS.peach}`}
            textAlign="center"
            lineHeight="50px"
            fontSize="24px"
            color={THEME_COLORS.peach}
            _hover={{
              backgroundColor: THEME_COLORS.peach,
              color: THEME_COLORS.white,
            }}
          >
            {link.icon}
          </Flex>
        </Link>
      ))}
    </VStack>
  );
}

export default ToolBar;
