import React from "react";
import "./App.css";
import { CustomNode, CustomNodeData } from "./components/Node";
import { useCallback, useMemo } from "react";
import { ChakraProvider } from "@chakra-ui/react";
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
interface MapNode extends Node {
  data: {
    sentences: string[];
  };
}
const initialNodes: MapNode[] = [
  {
    id: "Record",
    type: "record",
    draggable: false,
    position: { x: 0, y: 0 },
    data: {
      sentences: [],
    },
  },
  // {
  //   id: "Hackathons",
  //   type: "custom",
  //   position: { x: 0, y: 100 },
  //   data: {
  //     sentences: ["I love building at treehacks.", "Hackathons are awesome!"],
  //   },
  // },
];
const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];
const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const mapNodetoNode = (node: MapNode): Node => {
  return {
    id: node.id,
    type: node.type,
    position: node.position,
    data: { label: node.id, sentances: node.data.sentences },
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

  const createEdge = useCallback(
    (source: string, target: string) => {
      setEdges((eds) =>
        addEdge(
          {
            id: `${source}-${target}`,
            source,
            target,
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) =>
      createEdge(connection.source!, connection.target!),
    [createEdge]
  );

  const createNode = useCallback(
    (node: MapNode) => {
      setNodes((nds) => [...nds, { ...mapNodetoNode(node) }]);
    },
    [setEdges]
  );

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
