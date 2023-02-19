import { Center, Card, Flex, Heading, Link, Tag, Text } from "@chakra-ui/react";
import { Edge, Node } from "reactflow";
import { getTreeOrder } from "../../pages/GraphPage/util";
import { CustomMapNodeData, MapNode } from "../../types";
import { THEME_COLORS } from "../../util";
import { CustomNodeData } from "../Node";

interface GraphSummaryProps {
  nodes: Node<CustomMapNodeData, string | undefined>[];
  edges: Edge[];
}
export const GraphSummary = ({ nodes, edges }: GraphSummaryProps) => {
  // For each node, get the sentence that is connected to it
  // sort the nodes from the root node to the leaf nodes (as a tree)
  const orderedNodes = getTreeOrder(nodes as MapNode[], edges);

  if (orderedNodes.length === 1) {
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
        {orderedNodes.map((node) => {
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
            <Flex>
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

const LinkedHeader = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => (
  <Heading id={id}>
    {children}
    <a href={`#${id}`}>#</a>
  </Heading>
);
