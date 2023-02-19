import { Edge, Node } from "reactflow";
export enum NodeType {
  Record = "record",
  Custom = "custom",
}

export interface MapNode extends Node {
  type: NodeType;
  data: CustomMapNodeData;
}
export interface CustomMapNodeData {
  keyword: string;
  sentences: string[];
  updateGraph?: (nodes: MapNode[], edges: Edge[]) => void;
  setTranscript?: (transcript: string) => void;
}
