import {
  Center,
  Card,
  Flex,
  Heading,
  Link,
  Tag,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";
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
    <Link
      href={`#${id}`}
      role="group"
      _hover={{
        textDecor: "none",
      }}
    >
      <Flex alignItems={"center"}>
        <LinkIcon
          position="relative"
          visibility="hidden"
          marginLeft="-20px"
          boxSize={4}
          _groupHover={{
            visibility: "visible",
          }}
        />
        <Heading fontSize={fontSize} id={id}>
          {children}
        </Heading>
      </Flex>
    </Link>
  );
};

export const GraphSummary = ({ nodes, edges }: GraphSummaryProps) => {
  // For each node, get the sentence that is connected to it
  // sort the nodes from the root node to the leaf nodes (as a tree)

  // const orderedNodes = getTreeOrder(nodes as any, edges);

  const rootNode = nodes.find((node) => node.data.keyword === "root");
  if (!rootNode) {
    return null;
  }
  const everythingElse = nodes.filter((node) => node.data.keyword !== "root");
  everythingElse.sort((a, b) => (a.data.keyword > b.data.keyword ? 1 : -1));

  const orderedNodes = [rootNode, ...everythingElse];

  const styles = {
    bigDiv: {
      bgColor: THEME_COLORS.peach,
      flexDir: "column",
      minW: "500px",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      height: "calc(100vh - 32px)",
      minH: "400px",
      m: "4",
      p: "10",
      borderRadius: "10px",
      overflowY: "auto",
      boxShadow: "lg",
    } as any,
  };

  if (orderedNodes.length === 1) {
    return (
      <Center {...(styles.bigDiv as any)}>
        <Card {...styles.card}>
          <LinkedHeader fontSize="4xl" id="summary">
            Summary
          </LinkedHeader>
          <Text>
            No summary available. Try using the mic and see what happens!
          </Text>
          <Image
            boxSize="400px"
            src="half-speech-bubble.png"
            alt="speech bubble"
          />
        </Card>
      </Center>
    );
  }

  return (
    <Center {...(styles.bigDiv as any)}>
      <Card {...styles.card}>
        {orderedNodes.map((node) => {
          if (node.data.keyword === "root") {
            return (
              <Flex>
                <LinkedHeader fontSize="2xl" id="summary">
                  Summary
                </LinkedHeader>
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
                keyword: otherNodeId,
              };
            });
          return (
            <Flex flexDir="column" my={2}>
              <LinkedHeader id={keyword}>{keyword}</LinkedHeader>
              <p>{sentences}</p>
              <HStack>
                {relatedTopics.map(
                  (topic) =>
                    // TODO: add hyperlinks to the other nodes
                    topic.keyword && (
                      <Link href={`#${topic.keyword}`}>
                        <Tag
                          bgColor={
                            topic.type === "child" ? "red.300" : "yellow.300"
                          }
                        >
                          {topic.keyword}
                        </Tag>
                      </Link>
                    )
                )}
              </HStack>
            </Flex>
          );
        })}
      </Card>
    </Center>
  );
};
