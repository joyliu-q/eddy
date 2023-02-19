import { Handle, Position } from "reactflow";
import { useCallback, useState } from "react";
import { ReactComponent as DefaultMic } from "./DefaultMic.svg";
import { ReactComponent as MicPaused } from "./MicPaused.svg";
import useRecord from "../hooks/useRecord";
export const RecordNode = ({
  data: { updateGraph },
}: {
  data: {
    updateGraph: (nodes: any[], edges: any[]) => void;
  };
}) => {
  const { start, stop, recording } = useRecord(updateGraph);

  return (
    <>
      <Handle type="target" position={Position.Top} style={{ top: -3 }} />
      <div
        onClick={() => {
          if (recording) {
            stop();
          } else {
            start();
          }
        }}
      >
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
