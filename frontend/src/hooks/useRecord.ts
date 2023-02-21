import { useCallback, useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Edge } from "reactflow";
import { MapNode } from "../types";
import { addSentenceChunk } from "../utils/api";

const TICK_LENGTH_MS = 2000;
const TICK_LENGTH = 100;

const useRecord = (updateGraph: MapNode["data"]["updateGraph"]) => {
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
    console.log("transcript change", transcript);
  }, [transcript]);

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
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTranscript(data["text"]);
        });
    }
  }, [blobs]);

  useEffect(() => {
    if (!updateGraph) return;

    if (tick >= TICK_LENGTH) {
      console.log("big tick", tick);
      const work = async () => {
        const result = await addSentenceChunk(transcript);
        console.log(result);

        updateGraph(result.nodes, result.edges);
      };
      work();
      setTranscript("");
      setBlobs([]);
      setTick(0);
    }
  }, [tick, updateGraph]);

  const start = () => {
    startRecording();
    setBlobs([]);
    setTick(0);
    setTranscript("");

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
    stopRecording();

    if (!updateGraph) return;
    console.log("stop", transcript);

    const work = async () => {
      const result = await addSentenceChunk(transcript);
      console.log(result);

      updateGraph(result.nodes, result.edges);
    };

    setTranscript("");
    work();
  };

  return {
    start,
    stop,
    transcript,
  };
};

export default useRecord;
