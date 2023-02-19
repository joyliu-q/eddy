import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon, VStack, Flex } from "@chakra-ui/react";
import { THEME_COLORS } from "../../util";
import { ArrowBackIcon, ChatIcon, InfoIcon } from "@chakra-ui/icons";
import { GoListUnordered } from "react-icons/go";
import { useSearchParams } from 'react-router-dom'

interface NavLink {
  link: string | null;
  icon: React.ReactNode;
  onClick: () => void;
}

export function ToolBar({onSwitchMode}: {onSwitchMode: () => void}) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Check if the current pathname is '/about'
  let navLinks: NavLink[];
  const isOnAboutPage = location.pathname === "/about";
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
      onClick: onSwitchMode,
    },
    {
      link: "/chat",
      icon: <ChatIcon />,
      onClick: () => {},

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
      onClick: onSwitchMode,
    },
    {
      link: "/chat",
      icon: <ChatIcon />,
      onClick: () => {},
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
      top="20px"
      left="20px"
      zIndex="100"
      spacing="20px"
    >
      {(location.pathname === "/about" ? aboutNavLinks : searchParams.get("mode") === "graph" ? graphNavLinks : listNavLinks).map((link) => (
        
        link.link ? (
          <Link to={link.link}>
          <Flex
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
      ))}
    </VStack>
  );
}

export default ToolBar;
