import React from "react";
import "./App.css";
import { CustomNode, CustomNodeData } from "./components/Node";
import { useCallback, useMemo } from "react";
import { Button, ChakraProvider } from "@chakra-ui/react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  FitViewOptions,
  MarkerType,
  EdgeMarker,
} from "reactflow";
// 👇 you need to import the reactflow styles
import "reactflow/dist/style.css";
import { RecordNode } from "./components/RecordNode";
import { addSentence } from "./utils/api";

enum NodeType {
  Record = "record",
  Custom = "custom",
}

interface MapNode extends Node {
  keyword: string;
  type: NodeType;
  data: {
    sentences: string[];
  };
}
const initialNodes: MapNode[] = [
  {
    id: "root",
    keyword: "root",
    type: NodeType.Record,
    draggable: false,
    position: { x: 0, y: 0 },
    data: {
      sentences: [],
    },
  },
  {
    id: "Hackathons",
    type: "custom",
    position: { x: 0, y: 100 },
    data: {
      sentences: ["I love building at treehacks.", "Hackathons are awesome!"],
    },
  },
];
const initialEdges: Edge[] = [
  // {
  //   id: "e1-2",
  //   source: "1",
  //   target: "2",
  //   markerEnd: { type: MarkerType.ArrowClosed },
  // },
];
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

function App() {
  const nodeTypes = useMemo(
    () => ({ custom: CustomNode, record: RecordNode }),
    []
  );
  const [nodes, setNodes, onNodesChange] =
    useNodesState<CustomNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [recording, setRecording] = React.useState(false);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const updateGraph = useCallback((nodes: MapNode[], edges: Edge[]) => {
    setNodes(nodes.map(mapNodeToNode));
    setEdges(edges);
  }, []);

  const addSentenceToGraph = useCallback(async (sentence: string) => {
    const { edges, nodes } = await addSentence("Coding is the best");
    updateGraph(nodes, edges);
  }, []);

  return (
    <ChakraProvider>
      <div className="App">
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
      </div>
    </ChakraProvider>
  );
}

export default App;
