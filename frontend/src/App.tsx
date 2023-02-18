import React from "react";
import "./App.css";
import { CustomNode } from "./components/Node";
import { useCallback, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
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
    sentance: string;
  };
}
const initialNodes: MapNode[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 0, y: 0 },
    data: { sentance: "I love building at treehacks." },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 0, y: 100 },
    data: { sentance: "hackathons are quite a crazy experince" },
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
    data: { label: node.data.id, sentance: node.data.sentance },
  };
};

function App() {
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
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
      ></ReactFlow>
      <div onClick={() => setRecording((r) => !r)}>
        {recording ? (
          <MicPaused style={{ width: 80, height: 80 }} />
        ) : (
          <DefaultMic style={{ width: 80, height: 80 }} />
        )}
      </div>
    </div>
  );
}

export default App;
