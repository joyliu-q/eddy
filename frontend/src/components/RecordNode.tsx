import { Handle, Position } from "reactflow";
import { useCallback, useState } from "react";
import { ReactComponent as DefaultMic } from "./DefaultMic.svg";
import { ReactComponent as MicPause } from "./MicPaused.svg";
import useRecord from "../hooks/useRecord";
import { Flex } from "@chakra-ui/react";
import "./RecordNode.css";
export const RecordNode = ({
  data: { updateGraph },
}: {
  data: {
    updateGraph: (nodes: any[], edges: any[]) => void;
  };
}) => {
  const { start, stop, recording } = useRecord(updateGraph);

  return (
    <div className="mic">
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
          <Flex alignItems={"center"} justifyContent={"center"}>
            <div
              className="record-btn"
              style={{ animationDelay: ".1s", zIndex: -1 }}
            ></div>
            <div
              className="record-btn"
              style={{ animationDelay: ".2s", zIndex: -2 }}
            ></div>
            <div
              className="record-btn"
              style={{ animationDelay: ".4s", zIndex: -3 }}
            ></div>
            <div
              className="record-btn"
              style={{ animationDelay: ".65s", zIndex: -4 }}
            ></div>
            <MicPause style={{ width: 80, height: 80 }} />
          </Flex>
        ) : (
          <DefaultMic className="def-mic" style={{ width: 80, height: 80 }} />
        )}
      </div>
      <Handle
        className="Handle"
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ bottom: -3 }}
      />
    </div>
  );
};
