import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ]);
      startVideo();
    };

    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      video.addEventListener('play', () => {
        const canvas = canvasRef.current;
        if (canvas) {
          // console.log(displaySize);

          setInterval(async () => {
            const displaySize = { width: video.width, height: video.height };

            faceapi.matchDimensions(canvas, displaySize);
            const detections = await faceapi
              .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
              .withFaceExpressions();
            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize
            );

            canvas
              .getContext('2d')
              .clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          }, 10);
        }
      });
    }
  }, []);

  return (
    <div className="relative">
      <video ref={videoRef} width="720" height="560" autoPlay muted />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0 }} />
    </div>
  );
};

export default Camera;
