import { Edge } from "reactflow";
import { MapNode } from "../../types";

function findRootAndChildren(
  nodes: MapNode[],
  edges: Edge[]
): [MapNode, Map<MapNode, MapNode[]>] {
  const rootNode = nodes.find((n) => n.type === "record");

  const childMap = new Map<MapNode, MapNode[]>();
  const parentSet = new Set<MapNode>();
  for (const edge of edges) {
    const edgeSourceNode = nodes.find((n) => n.id === edge.source);
    const edgeTargetNode = nodes.find((n) => n.id === edge.target);
    if (!childMap.has(edgeSourceNode!)) {
      childMap.set(edgeSourceNode!, []);
    }
    childMap.get(edgeSourceNode!)!.push(edgeTargetNode!);
    parentSet.add(edgeSourceNode!);
  }
  let root: MapNode;
  for (const node of nodes) {
    if (!parentSet.has(node)) {
      root = node;
      break;
    }
  }
  return [root!, childMap];
}

function dfs(
  node: MapNode,
  childMap: Map<MapNode, MapNode[]>,
  result: MapNode[]
): void {
  result.push(node);
  console.log(result);
  if (childMap.has(node)) {
    for (const child of childMap.get(node)!) {
      dfs(child, childMap, result);
    }
  }
}

export function getTreeOrder(nodes: MapNode[], edges: Edge[]): MapNode[] {
  const [root, childMap] = findRootAndChildren(nodes, edges);
  const result: MapNode[] = [];
  dfs(root, childMap, result);
  return result;
}
