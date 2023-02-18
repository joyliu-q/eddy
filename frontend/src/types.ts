import { Node } from "reactflow";
export enum NodeType {
  Record = "record",
  Custom = "custom",
}

export interface MapNode extends Node {
  keyword: string;
  type: NodeType;
  data: {
    sentences: string[];
  };
}
