import { Flex, Text } from "@chakra-ui/react";
import { THEME_COLORS } from "../util";

export default function Navbar() {
  return (
    <Flex
      bg={THEME_COLORS.peach}
      w="100%"
      p={4}
      borderBottom={`2px solid ${THEME_COLORS.salmon}`}
      justifyContent="space-between"
    >
      <Text>
        <b>Treehacks</b>
      </Text>
      <Flex>
        <Text mr={4}>About</Text>
      </Flex>
    </Flex>
  )
}