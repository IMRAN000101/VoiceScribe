# Frontend Integration Guide

## How to Use the Backend from React

Your React frontend already has audio recording working. Here's how to integrate with the new backend:

### Prerequisites
- Backend running: `npm run dev` (in Backend folder)
- Backend listening on: `http://localhost:5000`

### Updated Audio Upload Component

Replace your audio upload logic with this:

```javascript
// src/components/AudioRecorder.jsx
import { useState, useRef } from "react";

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = handleRecordingStop;
      mediaRecorder.start();
      setIsRecording(true);
      setError("");
    } catch (err) {
      setError("Failed to access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleRecordingStop = async () => {
    const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
    await uploadAudio(audioBlob);
  };

  const uploadAudio = async (audioBlob) => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const response = await fetch("http://localhost:5000/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setTranscript(data.transcript);
      } else {
        setError(data.message || "Transcription failed");
      }
    } catch (err) {
      setError("Failed to upload audio: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={startRecording}
          disabled={isRecording || loading}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          {isRecording ? "Recording..." : "Start Recording"}
        </button>

        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Stop Recording
        </button>
      </div>

      {loading && <p className="text-blue-500">Transcribing...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {transcript && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
}
```

### Key Points

1. **CORS Enabled:** Backend allows requests from `http://localhost:3000`
2. **FormData Format:** Frontend sends audio as `audio` field
3. **Response Format:** Backend returns `{ success, transcript }` or `{ success, message }`
4. **Automatic Cleanup:** Backend deletes file after transcription
5. **Error Handling:** All errors returned as JSON

### Testing Flow

```
1. Click "Start Recording"
2. Speak into microphone
3. Click "Stop Recording"
4. Backend processes:
   - Validates file
   - Sends to Whisper API
   - Deletes temp file
   - Returns transcript
5. Transcript displayed in UI
```

### Backend Response Examples

**Success:**
```json
{
  "success": true,
  "transcript": "Hello everyone, thank you for coming today..."
}
```

**Error - Invalid File:**
```json
{
  "success": false,
  "message": "Invalid file type. Only audio files are allowed."
}
```

**Error - File Too Large:**
```json
{
  "success": false,
  "message": "File size exceeds 25MB limit."
}
```

**Error - Whisper API:**
```json
{
  "success": false,
  "message": "Failed to transcribe audio: API error message"
}
```

### Debugging

Open browser DevTools Console to see:

```javascript
// Check if backend is reachable
fetch("http://localhost:5000")
  .then(r => r.json())
  .then(console.log)

// Check upload endpoint
fetch("http://localhost:5000/api/transcribe", {
  method: "POST",
  body: new FormData() // empty, should return validation error
})
  .then(r => r.json())
  .then(console.log)
```

### Backend Logs

When you upload audio, you'll see in backend terminal:

```
[UPLOAD] File received: recording.webm
[UPLOAD] MIME type: audio/webm
[UPLOAD] Size: 123456 bytes
[UPLOAD] Processing file: audio_1687456789012.webm
[WHISPER] Sending file to OpenAI: uploads/audio_1687456789012.webm
[TRANSCRIPT] Transcription complete
[TRANSCRIPT] Text length: 142
[CLEANUP] File deleted: uploads/audio_1687456789012.webm
```

---

**Integration Complete!** Your React frontend can now record and transcribe audio.
