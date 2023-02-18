import { useEffect, useRef, useState } from "react";

const useRecord = () => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const mediaStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    const init = async () => {
      const stream = await getMediaStream();

      mediaStream.current = stream;
      chunks.current = [];
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };
      mediaRecorder.current.onstop = (e) => {
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
          });
      };
      mediaRecorder.current.onerror = (e) => {
        console.log(e);
      };
      mediaRecorder.current.onstart = (e) => {
        chunks.current = [];
      };
    };

    init();
  }, []);

  const getMediaStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    return stream;
  };

  const start = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.start();
      console.log("start");
    }
  };

  const stop = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      console.log("stop");
    }
  };

  return {
    start,
    stop,
  };
};

export default useRecord;
