import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const Camera = ({ setDetection }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [detections, setDetections] = useState([]);

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
  }, [capturedImage]);

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

            if (detections.length > 0) {
              setDetections(detections);
            } else {
              setDetections([]);
            }

            canvas
              .getContext('2d')
              .clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          }, 10);
        }
      });
    }
  }, [capturedImage]);

  // console.log(detected);

  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 720, 560);
    const imageSrc = canvasRef.current.toDataURL('image/jpeg');

    setCapturedImage(imageSrc);
    setDetection(detections[0].detection);
  };

  const retake = () => {
    setCapturedImage(null);
    setDetections([]);
    setDetection([]);
  };

  return (
    <div className="relative">
      {capturedImage ? (
        <>
          <img src={capturedImage} alt="" />

          <div onClick={retake} className="cursor-pointer z-[999] relative">
            Re-take
          </div>
        </>
      ) : (
        <>
          <video ref={videoRef} width="720" height="560" autoPlay muted />
          <canvas ref={canvasRef} style={{ position: 'absolute', top: 0 }} />

          {detections.length > 0 ? (
            <div
              onClick={captureImage}
              className="cursor-pointer z-[999] relative"
            >
              Capture
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default Camera;
