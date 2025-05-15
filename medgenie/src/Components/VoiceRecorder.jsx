import React, { useState } from 'react';
import axios from 'axios';

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setIsRecording(true);

      const chunks = [];
      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append("audio", audioBlob);

        axios.post("http://localhost:3000/upload-audio", formData)
          .then(() => {
            alert("Audio uploaded successfully!");
          })
          .catch(err => {
            console.error(err);
          });
      };

      recorder.start();
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      {!isRecording && (
        <button
          onClick={startRecording}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full text-xl shadow-lg hover:bg-blue-700 transition duration-300 z-50"
        >
          🎙️
        </button>
      )}

      {isRecording && (
        <div className="fixed bottom-24 right-6 bg-white p-4 rounded-xl shadow-lg z-50 flex items-center gap-3">
          <p className="text-black font-medium">Recording...</p>
          <button
            onClick={stopRecording}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;