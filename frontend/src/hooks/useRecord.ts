import { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const useRecord = () => {
  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    status,
    previewAudioStream,
  } = useReactMediaRecorder({ audio: true });

  const [recording, setRecording] = useState<boolean>(false);

  useEffect(() => {
    if (recording) {
      startRecording();

      const interval = setInterval(() => {
        console.log("chunked");
        stopRecording();
        startRecording();
      }, 10000);

      return () => {
        clearInterval(interval);
      };
    } else {
      stopRecording();
    }
  }, [recording, startRecording, stopRecording]);

  useEffect(() => {
    if (!mediaBlobUrl) {
      return;
    }

    const work = async () => {
      const audio = await fetch(mediaBlobUrl).then((res) => res.blob());

      const formData = new FormData();

      formData.append("audio", audio);

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
        });
    };

    work();
  }, [mediaBlobUrl]);

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
