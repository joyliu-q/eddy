import "./GraphPage.css";
import { CustomNode } from "../../components/Node";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { addSentenceChunk, getGraph } from "../../utils/api";
import { Flex, Text } from "@chakra-ui/react";
import { LiveTranscript } from "../../components/LiveTranscript";

// import { getTreeOrder } from "./util";

import { GraphSummary } from "../../components/GraphSummary";
import { NAVIGATION_STATE, useNavigation } from "../../hooks/useNavigation";

const initialEdges: Edge[] = [];
const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const mapNodeToNode = (
  node: any,
  extras: {
    updateGraph: MapNode["data"]["updateGraph"];
    setTranscript: MapNode["data"]["setTranscript"];
  }
): MapNode => {
  console.log(node);
  return {
    id: node.keyword,
    type: node.keyword === "root" ? NodeType.Record : NodeType.Custom,
    position: node.position,
    data: {
      keyword: node.keyword,
      sentences: node.data.sentences,
      updateGraph: extras.updateGraph,
      setTranscript: extras.setTranscript,
    },
  };
};

function GraphPage() {
  const [transcript, setTranscript] = useState<string>("");
  const { navigationState } = useNavigation();

  const updateTranscript = (transcript: string) => {
    setTranscript(transcript);
    console.log("UPDATING TRANSCRIPT", transcript);
  };
  const nodeTypes = useMemo(
    () => ({ custom: CustomNode, record: RecordNode }),
    []
  );
  const updateGraph = useCallback((nodes: MapNode[], edges: Edge[]) => {
    setNodes(
      nodes.map((x) =>
        mapNodeToNode(x, { updateGraph, setTranscript: updateTranscript })
      )
    );
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
        setTranscript: updateTranscript,
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

  useEffect(() => {
    getGraph().then((graph) => {
      const { edges, nodes } = graph;
      updateGraph(nodes, edges);
    });
  }, [transcript, updateGraph]);

  return (
    <>
      <Flex justifyContent={"space-between"}>
        {navigationState === NAVIGATION_STATE.SUMMARY && (
          <GraphSummary nodes={nodes} edges={edges} />
        )}
        <Layout>
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
              <Background color="#FFD39E" size={2} />
            </ReactFlow>
          </Flex>
        </Layout>
      </Flex>
      <LiveTranscript
        transcript={transcript}
        position="absolute"
        bottom="10px"
        left="50%"
        transform="translateX(-50%)"
      />
      {/* <Text
        position="absolute"
        bottom="10px"
        left="50%"
        transform="translateX(-50%)"
      >
        {transcript}
      </Text> */}
    </>
  );
}

export default GraphPage;
