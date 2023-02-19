import { Handle, Position } from "reactflow";
import { useCallback, useState } from "react";
import { ReactComponent as DefaultMic } from "./DefaultMic.svg";
import { ReactComponent as MicPaused } from "./MicPaused.svg";
export const RecordNode = () => {
  const [recording, setRecording] = useState(false);
  return (
    <>
      <Handle type="target" position={Position.Top} style={{ top: -3 }} />
      <div onClick={() => setRecording((r) => !r)}>
        {recording ? (
          <MicPaused style={{ width: 80, height: 80 }} />
        ) : (
          <DefaultMic style={{ width: 80, height: 80 }} />
        )}
      </div>
      <Handle
        className="Handle"
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ bottom: -3 }}
      />
    </>
  );
};
