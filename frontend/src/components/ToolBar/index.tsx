import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon, VStack, Flex } from "@chakra-ui/react";
import { THEME_COLORS } from "../../util";
import { ArrowBackIcon, ChatIcon, InfoIcon } from "@chakra-ui/icons";
import { GoListUnordered } from "react-icons/go";
import { NAVIGATION_STATE, useNavigation } from "../../hooks/useNavigation";

interface NavLink {
  link: string | null;
  icon: React.ReactNode;
  onClick: () => void;
}

export function ToolBar() {
  const location = useLocation();
  const { navigationState, setNavigationState } = useNavigation();

  // Check if the current pathname is '/about'
  const notFoundNavLinks: NavLink[] = [
    {
      link: "/",
      icon: <ArrowBackIcon />,
      onClick: () => {},
    },
  ];

  const aboutNavLinks = [
    {
      link: "/",
      icon: <ArrowBackIcon />,
      onClick: () => {},
    },
  ];
  const listNavLinks = [
    {
      icon: <ArrowBackIcon />,
      onClick: () => setNavigationState(NAVIGATION_STATE.GRAPH),
    },
    {
      link: "/about",
      icon: <InfoIcon />,
      onClick: () => {},
    },
  ];

  const graphNavLinks = [
    {
      link: null,
      icon: <Icon as={GoListUnordered} />,
      onClick: () => setNavigationState(NAVIGATION_STATE.SUMMARY),
    },
    {
      link: "/about",
      icon: <InfoIcon />,
      onClick: () => {},
    },
  ];

  return (
    <VStack
      position="absolute"
      top="40px"
      left="40px"
      zIndex="100"
      spacing="20px"
    >
      {(location.pathname === "/about"
        ? aboutNavLinks
        : navigationState === NAVIGATION_STATE.SUMMARY
        ? listNavLinks
        : location.pathname === "/"
        ? graphNavLinks
        : notFoundNavLinks
      ).map((link) =>
        link.link ? (
          <Link to={link.link}>
            <Flex
              w="48px"
              h="48px"
              borderRadius="50%"
              alignItems={"center"}
              justifyContent={"center"}
              boxShadow={`0 2px 4px ${THEME_COLORS.peach}`}
              border={`2px solid ${THEME_COLORS.salmon}`}
              textAlign="center"
              lineHeight="50px"
              fontSize="24px"
              color={THEME_COLORS.salmon}
              _hover={{
                backgroundColor: THEME_COLORS.salmon,
                color: THEME_COLORS.eggshell,
              }}
            >
              {link.icon}
            </Flex>
          </Link>
        ) : (
          <Flex
            onClick={() => link.onClick()}
            w="50px"
            h="50px"
            borderRadius="50%"
            alignItems={"center"}
            justifyContent={"center"}
            boxShadow={`0 2px 4px ${THEME_COLORS.peach}`}
            border={`2px solid ${THEME_COLORS.salmon}`}
            textAlign="center"
            lineHeight="50px"
            fontSize="24px"
            color={THEME_COLORS.salmon}
            _hover={{
              backgroundColor: THEME_COLORS.salmon,
              color: THEME_COLORS.eggshell,
            }}
          >
            {link.icon}
          </Flex>
        )
      )}
    </VStack>
  );
}

export default ToolBar;
