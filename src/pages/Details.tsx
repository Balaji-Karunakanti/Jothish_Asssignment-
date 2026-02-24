import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Employee = string[];

const Details: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const employee: Employee | undefined = location.state?.employee;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);

  // 🔐 Protect Route
  useEffect(() => {
    if (!employee) {
      navigate("/list");
    }
  }, [employee, navigate]);

  // 🎥 Open Camera
  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;

        // Wait until video metadata loads
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }

      setStream(mediaStream);
      setCameraOpen(true);
    } catch (error) {
      alert("Camera access denied or not available.");
    }
  };

  // 📸 Capture Photo (FIXED VERSION)
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    // Ensure video is ready
    if (video.readyState !== 4) {
      alert("Camera not ready. Please wait...");
      return;
    }

    const width = video.videoWidth;
    const height = video.videoHeight;

    if (!width || !height) {
      alert("Unable to capture image.");
      return;
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);

    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);

    // Stop camera
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    setCameraOpen(false);
  };

  // 🔁 Retake
  const handleRetake = () => {
    setCapturedImage(null);
    openCamera();
  };

  // ➡ Continue
  const handleContinue = () => {
    if (!capturedImage) return;

    navigate("/photo-result", {
      state: {
        image: capturedImage,
        employee,
      },
    });
  };

  if (!employee) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}>←</button>
        <h1 className="text-xl font-bold">Employee Details</h1>
      </div>

      {/* Employee Info Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <img
              src="https://i.pravatar.cc/150"
              className="w-20 h-20 rounded-xl"
              alt="avatar"
            />
            <div>
              <h2 className="text-2xl font-bold">{employee[0]}</h2>
              <p className="text-gray-500">{employee[2]}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="bg-yellow-400 px-4 py-1 rounded-full text-sm font-semibold">
              {employee[5]} / yr
            </p>
            <p className="text-green-600 text-sm mt-2">ACTIVE</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6 text-sm">
          <div>
            <p className="text-gray-400">Department</p>
            <p>{employee[1]}</p>
          </div>
          <div>
            <p className="text-gray-400">Extension</p>
            <p>{employee[3]}</p>
          </div>
          <div>
            <p className="text-gray-400">Start Date</p>
            <p>{employee[4]}</p>
          </div>
        </div>
      </div>

      {/* Identity Verification */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="font-semibold mb-4">Identity Verification</h3>

        {/* Open Camera Button */}
        {!cameraOpen && !capturedImage && (
          <button
            onClick={openCamera}
            className="bg-yellow-400 px-6 py-3 rounded-lg font-medium"
          >
            Open Camera
          </button>
        )}

        {/* Camera Preview */}
        {cameraOpen && (
          <div className="mt-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="rounded-xl w-full"
            />
            <button
              onClick={capturePhoto}
              className="bg-black text-white px-6 py-3 mt-4 rounded-lg"
            >
              Capture Photo
            </button>
          </div>
        )}

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Captured Image Preview */}
        {capturedImage && (
          <div className="mt-6">
            <img
              src={capturedImage}
              alt="captured"
              className="w-48 rounded-xl border"
            />

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleRetake}
                className="bg-gray-200 px-6 py-2 rounded-lg"
              >
                Retake
              </button>

              <button
                onClick={handleContinue}
                className="bg-yellow-400 px-6 py-2 rounded-lg"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;