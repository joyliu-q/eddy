import React from "react";
import "./App.css";
import { CustomNode, CustomNodeData } from "./components/Node";
import { useCallback, useMemo } from "react";
import { ChakraProvider } from '@chakra-ui/react'
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
import { ReactComponent as DefaultMic } from "./DefaultMic.svg";
import { ReactComponent as MicPaused } from "./MicPaused.svg";
interface MapNode extends Node {
  data: {
    sentences: string[];
  };
}
const initialNodes: MapNode[] = [
  {
    id: "Hackathons",
    type: "custom",
    position: { x: 0, y: 0 },
    data: {
      sentences: ["I love building at treehacks.", "Hackathons are awesome!"],
    },
  },
  {
    id: "Pets",
    type: "custom",
    position: { x: 0, y: 100 },
    data: {
      sentences: [
        "I like pets and I cannot lie",
        "Cat's are cool and so are dogs",
      ],
    },
  },
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
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const [nodes, setNodes, onNodesChange] =
    useNodesState<CustomNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [recording, setRecording] = React.useState(false);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

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
          style={{ backgroundColor: "#FFFAEF" }}
        >
          <Background color="#FFD39E"/>
        </ReactFlow>
        <div onClick={() => setRecording((r) => !r)}>
          {recording ? (
            <MicPaused style={{ width: 80, height: 80 }} />
          ) : (
            <DefaultMic style={{ width: 80, height: 80 }} />
          )}
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
