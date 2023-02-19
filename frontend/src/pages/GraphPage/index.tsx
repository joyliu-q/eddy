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
];
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

function GraphPage() {
  const nodeTypes = useMemo(
    () => ({ custom: CustomNode, record: RecordNode }),
    []
  );
  const [nodes, setNodes, onNodesChange] =
    useNodesState<CustomNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const updateGraph = useCallback((nodes: MapNode[], edges: Edge[]) => {
    setNodes(nodes.map(mapNodeToNode));
    setEdges(edges);
  }, []);

  const addSentenceToGraph = useCallback(async (sentence: string) => {
    const { edges, nodes } = await addSentenceChunk(sentence);
    updateGraph(nodes, edges);
  }, []);

  return (
    <Layout>
      <div className="graph">
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
    </Layout>
  );
}

export default GraphPage;
