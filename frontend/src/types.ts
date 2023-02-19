import { Edge, Node } from "reactflow";
export enum NodeType {
  Record = "record",
  Custom = "custom",
}

export interface MapNode extends Node {
  keyword: string;
  type: NodeType;
  data: {
    sentences: string[];
    updateGraph?: (nodes: MapNode[], edges: Edge[]) => void;
    setTranscript?: (transcript: string) => void;
  };
}
