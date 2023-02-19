import React from "react";
import "./GraphPage.css";
import { CustomNode, CustomNodeData } from "../../components/Node";
import { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Connection,
  FitViewOptions,
} from "reactflow";
// 👇 you need to import the reactflow styles
import "reactflow/dist/style.css";
import { RecordNode } from "../../components/RecordNode";
import { MapNode, NodeType } from "../../types";
import { Layout } from "../../components/Layout";
import { addSentenceChunk } from "../../utils/api";
import { Card, Center, Flex, Heading, Link, Tag, Text } from "@chakra-ui/react";
import { THEME_COLORS } from "../../util";
import { getTreeOrder } from "./util";

const initialEdges: Edge[] = [];
const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const mapNodeToNode = (node: any): MapNode => {
  return {
    id: node.keyword,
    keyword: node.keyword,
    type: node.keyword === "root" ? NodeType.Record : NodeType.Custom,
    position: node.position,
    data: { sentences: node.data.sentences },
  };
};

export enum DisplayMode {
  GraphMode = "graph",
  TaskMode = "task",
}

const LinkedHeader = ({ children, id }: { children: React.ReactNode; id: string }) =>
  <Heading id={id}>{children}<a href={`#${id}`}>#</a></Heading>;

const getSummary = (nodes: MapNode[], edges: Edge[]) => {
  // For each node, get the sentence that is connected to it
  // sort the nodes from the root node to the leaf nodes (as a tree)
  const orderedNodes = getTreeOrder(nodes, edges);

  if (orderedNodes.length === 1) {
    return <Center bgColor={THEME_COLORS.peach} flexDir="column" minW="500px" minH="100vh" display="flex" height="100%" justifyContent="center" alignItems="center">
      <Card m="4" p="10" borderRadius="10px" boxShadow="lg">
        <LinkedHeader id="summary">Summary</LinkedHeader>
        <Text>
          No summary available. Try using the mic and see what happens!
        </Text>
      </Card>
    </Center>;
  }

  return (
    <Center bgColor={THEME_COLORS.peach} flexDir="column" minW="500px" minH="100vh" display="flex" height="100%" justifyContent="center" alignItems="center">
      <Card m="4" p="10" borderRadius="10px" boxShadow="lg">
      {
        orderedNodes.map((node) => {
          if (node.keyword === "root") {
            return <Flex>
              <LinkedHeader id="summary">Summary</LinkedHeader>
            </Flex>;
          }

          const keyword = node.keyword;
          const sentences = node.data.sentences;
          const relatedTopics = edges.filter((edge) => edge.source === node.id || edge.target === node.id).map(edge => {
            const otherNodeId = edge.source === node.id ? edge.target : edge.source;
            return ({
              type: edge.source === node.id ? "child" : "parent",
              keyword: nodes.find(n => node.id === otherNodeId)?.keyword,
            });
          });
          return (
            <Flex>
              <LinkedHeader id={keyword}>{keyword}</LinkedHeader>
              <p>{sentences}</p>
              {relatedTopics.map((topic) => (
                // TODO: add hyperlinks to the other nodes
                <Link href={`#${topic.keyword}`}>
                  <Tag bgColor={topic.type === "child" ? "red.300" : "yellow.300"}>
                    {topic.keyword}
                  </Tag>
                </Link>
                ))}
            </Flex>
          )
        })
      }
      </Card>
    </Center>
  );
}


function GraphPage({ mode = DisplayMode.GraphMode }: { mode?: DisplayMode }) {
  const nodeTypes = useMemo(
    () => ({ custom: CustomNode, record: RecordNode }),
    []
  );
  const updateGraph = useCallback((nodes: MapNode[], edges: Edge[]) => {
    setNodes(nodes.map(mapNodeToNode));
    setEdges(edges);
  }, []);
  const initialNodes: MapNode[] = [
    {
      id: "root",
      keyword: "root",
      type: NodeType.Record,
      draggable: false,
      position: { x: 0, y: 0 },
      data: {
        sentences: [],
        updateGraph,
      },
    },
  ];
  const [nodes, setNodes, onNodesChange] =
    useNodesState<CustomNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addSentenceToGraph = useCallback(async (sentence: string) => {
    const { edges, nodes } = await addSentenceChunk(sentence);
    updateGraph(nodes, edges);
  }, []);

  return (
    <Layout>
      <Flex justifyContent={"space-between"}>
        {
          mode === DisplayMode.TaskMode && 
            getSummary(nodes as any, edges)
        }
        <Flex
          textAlign={'center'} 
          width={ mode === DisplayMode.TaskMode ? "calc(100vw - 500px)" : "100vw"}
          height="100vh"
          flexDir="column"
          justifyContent={"center"}
          alignItems="center"
          backgroundColor="#FFF7E4"
        >
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            fitViewOptions={fitViewOptions}
          >
            <Background color="#FFD39E" />
          </ReactFlow>
        </Flex>
      </Flex>
    </Layout>
  );
}

export default GraphPage;
