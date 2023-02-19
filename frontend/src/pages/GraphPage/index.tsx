import "./GraphPage.css";
import { CustomNode } from "../../components/Node";
import { useCallback, useMemo, useState } from "react";
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
import { CustomMapNodeData, MapNode, NodeType } from "../../types";
import { Layout } from "../../components/Layout";
import { addSentenceChunk } from "../../utils/api";
import { Flex, Text } from "@chakra-ui/react";
import { LiveTranscript } from "../../components/LiveTranscript";

import { GraphSummary } from "../../components/GraphSummary";
import { NAVIGATION_STATE, useNavigation } from "../../hooks/useNavigation";

const initialEdges: Edge[] = [];
const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const mapNodeToNode = (node: any): MapNode => {
  return {
    id: node.keyword,
    type: node.keyword === "root" ? NodeType.Record : NodeType.Custom,
    position: node.position,
    data: { sentences: node.data.sentences, keyword: node.keyword },
  };
};

function GraphPage() {
  const [transcript, setTranscript] = useState<string>("");
  const { navigationState } = useNavigation();

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
      type: NodeType.Record,
      draggable: false,
      position: { x: 0, y: 0 },
      data: {
        keyword: "root",
        sentences: [],
        updateGraph,
        setTranscript,
      },
    },
  ];
  const [nodes, setNodes, onNodesChange] =
    useNodesState<CustomMapNodeData>(initialNodes);
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
        {navigationState === NAVIGATION_STATE.SUMMARY && (
          <GraphSummary nodes={nodes} edges={edges} />
        )}
        <Flex
          textAlign={"center"}
          width={
            navigationState === NAVIGATION_STATE.SUMMARY
              ? "calc(100vw - 500px)"
              : "100vw"
          }
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
      <LiveTranscript
        transcript={transcript}
        position="absolute"
        bottom="10px"
        left="50%"
        transform="translateX(-50%)"
      />
      <Text position="absolute" bottom="10px" left="10px">
        {transcript}
      </Text>
    </Layout>
  );
}

export default GraphPage;
