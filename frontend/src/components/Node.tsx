import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import "./Node.css";

export interface CustomNodeData {
  sentences: string[];
}

export const CustomNode = ({
  data,
  id,
}: {
  data: CustomNodeData;
  id: string;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="Node">
        <div className="title">
          <p>{id}</p>
          <button
            className="collapse-btn"
            onClick={() => setCollapsed((a) => !a)}
          >
            ^
          </button>
        </div>
        {!collapsed && (
          <ul>
            {data.sentences.map((sentence: string, index: number) => {
              return <li key={index}>{sentence}</li>;
            })}
          </ul>
        )}
      </div>
      <Handle
        className="Handle"
        type="source"
        position={Position.Bottom}
        id="a"
      />
    </>
  );
};
