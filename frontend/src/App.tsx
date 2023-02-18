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
} from "reactflow";
// 👇 you need to import the reactflow styles
import "reactflow/dist/style.css";
const initialNodes: Node[] = [
  { id: "1", type: "custom", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", type: "custom", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];
const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};
function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const addExpNode = () => {
    setNodes((nodes) => [
      ...nodes,
      { id: "3", position: { x: 100, y: 100 }, data: { label: "Test" } },
    ]);
  };
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
      <button onClick={() => addExpNode()}>Click me!</button>
    </div>
  );
}

export default App;
