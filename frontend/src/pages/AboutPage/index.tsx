import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { Layout } from "../../components/Layout";
import { THEME_COLORS } from "../../util";
import Logo from "./Logo";
import Ripple from "./Ripple";
import { ReactComponent as DefaultMic } from "../../components/DefaultMic.svg";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const cardStyle = {
    bgColor: THEME_COLORS.yellow,
    p: 4,
  };

  return (
    <Layout>
      <Box>
        <Flex
          flexDir="column"
          width="100vw"
          bgColor={THEME_COLORS.peach}
          height="calc(100vh - 100px)"
          maxHeight="100vh"
          justifyContent="space-between"
        >
          <Flex
            position="relative"
            width="100%"
            height="100%"
            p={4}
            textAlign="center"
            textColor={THEME_COLORS.salmon}
            flexDir="column"
            justifyContent={"end"}
            alignItems="center"
          >
            <Flex marginBottom={0} justifyContent="center" alignItems="center">
              <Icon viewBox="0 0 380 318" w="200px" h="200px">
                <Logo />
              </Icon>
              <Box p={2} />
              <Heading alignItems="center" fontSize="8xl">
                Eddy
              </Heading>
            </Flex>

            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button
                size={"lg"}
                width={"max-content"}
                _hover={{ background: THEME_COLORS.yellow }}
                color={THEME_COLORS.salmon}
                background={THEME_COLORS.eggshell}
                borderRadius={20}
              >
                Add Autopilot To Your Thoughts 🚀
              </Button>
            </Link>
          </Flex>
          <Ripple />
        </Flex>
        <Container maxW="container.lg">
          <VStack spacing="4">
            <Card {...cardStyle}>
              <CardBody>
                <Flex>
                  <Image boxSize="300px" src="ideation.png" alt="ideation" />
                  <Stack p={4} divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="lg">
                        Studies show we have 6200 thoughts per day (Nature)
                      </Heading>
                      <Text pt="2" fontSize="md">
                        The majority of these thoughts are lost due to our
                        inability to capture and organize them.
                      </Text>
                      <Text pt="2" fontSize="md">
                        Eddy is designed to help you overcome the common
                        challenges of brainstorming and productivity. With Eddy,
                        you can track your ideas by simply speaking to the mic,
                        allowing you to channel your stream of consciousness
                        without any interruption.
                      </Text>
                    </Box>
                  </Stack>
                </Flex>
              </CardBody>
            </Card>
            <Card>
              <Image src="demo.png" alt="demo" />
            </Card>
            <Card {...cardStyle}>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="lg">Just a click of the mic</Heading>
                    <Text pt="2" fontSize="md">
                      Eddy uses speech recognition to capture your thoughts and
                      organize them into a graph structure. All you need to do
                      is click on the mic button and start speaking. Eddie will
                      capture your thoughts and create graphs and summaries for
                      you, making it easy for you to see your ideas in a new
                      light.
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
            <Flex>
              <Card
                maxW="sm"
                {...cardStyle}
                border={`2px solid ${THEME_COLORS.peach}`}
                bgColor={THEME_COLORS.eggshell}
              >
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="lg">Turn Ideas into Reality</Heading>
                      <Text pt="2" fontSize="md">
                        With image exports, AI generated mood boards, and a
                        summary of your ideas, Eddy will help you turn your
                        ideas into reality. Eddy will help you visualize your
                        ideas and make them tangible.
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
              <Box p={2} />
              <Card
                maxW="sm"
                {...cardStyle}
                border={`2px solid ${THEME_COLORS.peach}`}
                bgColor={THEME_COLORS.paleYellow}
              >
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="lg">Gain Key Insights</Heading>
                      <Text pt="2" fontSize="md">
                        Unravel your ideas and learn more about your thinking
                        style with your generated spokesona. Are you more of a
                        depth or breadth thinker? What is the branching factor
                        of your ideas? Eddy will help you answer these questions
                        and more.
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
              <Box p={2} />
              <Card
                maxW="sm"
                {...cardStyle}
                border={`2px solid ${THEME_COLORS.peach}`}
                bgColor={THEME_COLORS.eggshell}
              >
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="lg">Interactive Ideation</Heading>
                      <Text pt="2" fontSize="md">
                        Whether it is by yourself or in a group meeting, Eddy
                        makes it interactive and fun to brainstorm, with
                        real-time feedback and you speak.
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </VStack>

          <Flex marginY={16} alignItems={"center"} justifyContent={"center"}>
            <Button
              as="a"
              href="/"
              pl={0}
              display="flex"
              justifyContent="left"
              minHeight="100px"
              size="md"
              paddingY={8}
              colorScheme="red"
              borderRadius="48px"
              _hover={{ transform: "scale(.95)" }}
            >
              <DefaultMic
                className="def-mic"
                style={{ width: 100, height: 100 }}
              />
              <Logo
                color={THEME_COLORS.salmon}
                alternateColor={THEME_COLORS.yellow}
              />
              <Heading width="50%" marginLeft={4}>
                Record.
              </Heading>
            </Button>
          </Flex>
        </Container>
      </Box>
    </Layout>
  );
}
