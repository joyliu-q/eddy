import { Box, Card, CardBody, Container, Flex, Heading, Image, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { THEME_COLORS } from "../../util";

export default function AboutPage() {
  return (
    <Box>
      <Flex>
        <Heading>Eddy</Heading>
      </Flex>
      <Container maxW="container.lg">
        <VStack spacing='4'>
          <Card bgColor={THEME_COLORS.yellow}>
            <CardBody>
              <Flex>
                <Image boxSize="200px" src="ideation.png" alt="ideation" />
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='md'>Studies show we have 6200 thoughts per day (Nature)</Heading>  
                    <Text pt='2' fontSize='sm'>
                      The majority of these thoughts are lost due to our inability to capture and organize them.
                    </Text>
                    <Text pt='2' fontSize='sm'>
                      Eddy is designed to help you overcome the common challenges of brainstorming and productivity. With Eddy, you can track your ideas by simply speaking to the mic, allowing you to channel your stream of consciousness without any interruption.
                    </Text>
                  </Box>
                </Stack>
              </Flex>
            </CardBody>
          </Card>
          <Card bgColor={THEME_COLORS.yellow}>
            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='md'>Just a click of the mic</Heading>  
                  <Text pt='2' fontSize='sm'>
                    Eddy uses speech recognition to capture your thoughts and organize them into a graph structure. All you need to do is click on the mic button and start speaking. Eddie will capture your thoughts and create graphs and summaries for you, making it easy for you to see your ideas in a new light.
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
          <Flex>
            <Card maxW="sm" bgColor={THEME_COLORS.yellow}>
              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='md'>Turn Ideas into Reality</Heading>  
                    <Text pt='2' fontSize='sm'>
                      With image exports, AI generated mood boards, and a summary of your ideas, Eddy will help you turn your ideas into reality. Eddy will help you visualize your ideas and make them tangible.
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
            <Card maxW="sm" bgColor={THEME_COLORS.yellow}>
              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='md'>Gain Key Insights</Heading>  
                    <Text pt='2' fontSize='sm'>
                      Unravel your ideas and learn more about your thinking style with your generated spokesona. Are you more of a depth or breadth thinker? What is the branching factor of your ideas? Eddy will help you answer these questions and more.
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
            <Card maxW="sm" bgColor={THEME_COLORS.yellow}>
              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='md'>Turn Ideas into Reality</Heading>  
                    <Text pt='2' fontSize='sm'>
                      With image exports, AI generated mood boards, and a summary of your ideas, Eddy will help you turn your ideas into reality.
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}