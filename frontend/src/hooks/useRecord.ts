import { useCallback, useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Edge } from "reactflow";
import { MapNode } from "../types";

const TICK_LENGTH_MS = 2000;

const useRecord = () => {
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      audio: true,
    }
  );
  const tickTimer = useRef<NodeJS.Timeout>();
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [transcript, setTranscript] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (mediaBlobUrl) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then((blob) => {
          setBlobs((prev) => [...prev, blob]);
          console.log(blob.type);
        });
    }
  }, [mediaBlobUrl]);

  useEffect(() => {
    if (blobs.length > 0) {
      console.log(blobs);
      const fullBlob = new Blob(blobs, { type: "audio/wav" });

      const formData = new FormData();

      formData.append("audio", fullBlob);

      fetch("http://localhost:8000/scribe", {
        method: "POST",
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.text())
        .then((data) => {
          setTranscript(data);
        });
    }
  }, [blobs]);
  const start = () => {
    startRecording();
    setBlobs([]);

    tickTimer.current = setInterval(() => {
      setTick((prev) => prev + 1);

      stopRecording();
      startRecording();
    }, TICK_LENGTH_MS);
  };

  const stop = () => {
    if (tickTimer.current) {
      clearInterval(tickTimer.current);
    }
  };

  return {
    start,
    stop,
    transcript,
  };
};

export default useRecord;
