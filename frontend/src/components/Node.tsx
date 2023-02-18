import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import "./Node.css";

export const CustomNode = ({ data }: { data: any }) => {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="Node">
        <label htmlFor="text">{data.label}</label>
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
