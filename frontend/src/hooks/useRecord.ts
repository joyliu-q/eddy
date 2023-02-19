import { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const useRecord = () => {
  const { startRecording, stopRecording, mediaBlobUrl, status } =
    useReactMediaRecorder({ audio: true });

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const mediaStream = useRef<MediaStream | null>(null);
  const endTimeout = useRef<NodeJS.Timeout | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const stream = await getMediaStream();

      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        console.log("data available");
        chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = (e) => {
        console.log("stopped");

        transcribeChunks();
        console.log("HI");

        if (recording) {
          mediaRecorder.current?.start();
        }
      };

      mediaRecorder.current.onstart = (e) => {
        console.log("started");
        chunks.current = [];

        endTimeout.current = setTimeout(() => {
          console.log("stopping automatically after 3sec");
          if (mediaRecorder.current) {
            console.log("stopping automatically after 3sec");
            mediaRecorder.current.stop();
          }
        }, 3000);
      };

      mediaRecorder.current.onerror = (e) => {
        console.log(e);
      };
    };

    init();
  }, [recording]);

  useEffect(() => {
    console.log(recording);
    if (recording) {
      if (mediaRecorder.current?.state === "inactive") {
        mediaRecorder.current?.start();
      }
    } else {
      if (endTimeout.current) {
        clearTimeout(endTimeout.current);

        endTimeout.current = null;
      }

      if (mediaRecorder.current?.state === "recording") {
        mediaRecorder.current?.stop();
      }
    }
  }, [recording]);

  const transcribeChunks = async () => {
    const blob = new Blob(chunks.current, { type: "audio/wav" });
    const file = new File([blob], "audio.wav", {
      type: "audio/wav",
    });

    const formData = new FormData();
    formData.append("audio", file);

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
        chunks.current = [];
      });
  };

  const getMediaStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    return stream;
  };

  const start = () => {
    setRecording(true);
  };

  const stop = () => {
    setRecording(false);
  };

  return {
    start,
    stop,
  };
};

export default useRecord;
