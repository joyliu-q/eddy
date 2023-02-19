import { Center, Card, Flex, Heading, Link, Tag, Text, HStack } from "@chakra-ui/react";
import { Edge, Node } from "reactflow";
import { getTreeOrder } from "../../pages/GraphPage/util";
import { CustomMapNodeData, MapNode } from "../../types";
import { THEME_COLORS } from "../../util";
import { CustomNodeData } from "../Node";
import { LinkIcon } from "@chakra-ui/icons";

interface GraphSummaryProps {
  nodes: Node<CustomMapNodeData, string | undefined>[];
  edges: Edge[];
}

const LinkedHeader = ({
  fontSize = "lg",
  children,
  id,
}: {
  fontSize?: string;
  children: React.ReactNode;
  id: string;
  }) => {
  return (
    <Link href={`#${id}`} role="group" _hover={{
      textDecor: 'none'
    }}>
      <Flex alignItems={"center"}>
        <LinkIcon
          position="relative"
          visibility="hidden" marginLeft="-20px" boxSize={4}
          _groupHover={{
            visibility: 'visible'
          }}
        />
        <Heading fontSize={fontSize} id={id}>
          {children}
        </Heading>
      </Flex>
    </Link>
  );
  }

const getSummary = (nodes: MapNode[], edges: Edge[]) => {
  // For each node, get the sentence that is connected to it
  // sort the nodes from the root node to the leaf nodes (as a tree)
  // const orderedNodes = getTreeOrder(nodes, edges);

  if (nodes.length === 1) {
    return (
      <Center
        bgColor={THEME_COLORS.peach}
        flexDir="column"
        minW="500px"
        h="100vh"
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Card maxH="100vh" minH="100px" m="4" p="10" borderRadius="10px" boxShadow="lg">
          <LinkedHeader fontSize="2xl" id="summary">Summary</LinkedHeader>
          <Text>
            No summary available. Try using the mic and see what happens!
          </Text>
        </Card>
      </Center>
    );
  }

  return (
    <Center
      bgColor={THEME_COLORS.peach}
      flexDir="column"
      width="50vw"
      maxW="500px"
      h="100vh"
      display="flex"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Card maxH="calc(100vh - 32px)" minH="100px" m="4" p="10" borderRadius="10px" boxShadow="lg">
        {nodes.map(node => {
          if (node.data.keyword === "root") {
            return (
              <Flex>
                <LinkedHeader fontSize="2xl" id="summary">Summary</LinkedHeader>
              </Flex>
            );
          }

          const keyword = node.data.keyword;
          const sentences = node.data.sentences;
          const relatedTopics = edges
            .filter(
              (edge) => edge.source === node.id || edge.target === node.id
            )
            .map((edge) => {
              const otherNodeId =
                edge.source === node.id ? edge.target : edge.source;
              return {
                type: edge.source === node.id ? "child" : "parent",
                keyword: nodes.find((n) => node.id === otherNodeId)?.data.keyword,
              };
            });
          return (
            <Flex flexDir="column">
              <LinkedHeader id={keyword}>{keyword}</LinkedHeader>
              <p>{sentences}</p>
              {relatedTopics.map((topic) => (
                // TODO: add hyperlinks to the other nodes
                <Link href={`#${topic.keyword}`}>
                  <Tag
                    bgColor={topic.type === "child" ? "red.300" : "yellow.300"}
                  >
                    {topic.keyword}
                  </Tag>
                </Link>
              ))}
            </Flex>
          );
        })}
      </Card>
    </Center>
  );
};


export const GraphSummary = ({ nodes, edges }: GraphSummaryProps) => {
  // For each node, get the sentence that is connected to it
  // sort the nodes from the root node to the leaf nodes (as a tree)
  const orderedNodes = getTreeOrder(nodes as MapNode[], edges);

  if (nodes.length === 1) {
    return (
      <Center
        bgColor={THEME_COLORS.peach}
        flexDir="column"
        minW="500px"
        minH="100vh"
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Card m="4" p="10" borderRadius="10px" boxShadow="lg">
          <LinkedHeader id="summary">Summary</LinkedHeader>
          <Text>
            No summary available. Try using the mic and see what happens!
          </Text>
        </Card>
      </Center>
    );
  }

  return (
    <Center
      bgColor={THEME_COLORS.peach}
      flexDir="column"
      minW="500px"
      minH="100vh"
      display="flex"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Card m="4" p="10" borderRadius="10px" boxShadow="lg">
        {nodes.map((node) => {
          if (node.id === "root") {
            return (
              <Flex>
                <LinkedHeader id="summary">Summary</LinkedHeader>
              </Flex>
            );
          }

          const { keyword, sentences } = node.data;
          const relatedTopics = edges
            .filter(
              (edge) => edge.source === node.id || edge.target === node.id
            )
            .map((edge) => {
              const otherNodeId =
                edge.source === node.id ? edge.target : edge.source;
              return {
                type: edge.source === node.id ? "child" : "parent",
                keyword: nodes.find((n) => node.id === otherNodeId)?.data
                  .keyword,
              };
            });
          return (
            <Flex flexDir="column">
              <LinkedHeader id={keyword}>{keyword}</LinkedHeader>
              <p>{sentences}</p>
              <HStack>
                {relatedTopics.map((topic) => (
                  // TODO: add hyperlinks to the other nodes
                  <Link href={`#${topic.keyword}`}>
                    <Tag
                      bgColor={topic.type === "child" ? "red.300" : "yellow.300"}
                    >
                      {topic.keyword}
                    </Tag>
                  </Link>
                ))}
              </HStack>
            </Flex>
          );
        })}
      </Card>
    </Center>
  );
};
