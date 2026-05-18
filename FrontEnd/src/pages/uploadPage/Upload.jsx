import React from "react";
import Logo_bold_without_name from "../../assets/logo/Logo_bold_without_name.svg";
import logo from "../../assets/logo/logo.png";
import downloadimg from "../../assets/downloadimg/Downloads.png";

import { useState } from "react";
import "./upload.css";

export default function UploadPage() {
  const [tracks, setTracks] = useState([]);

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    if (tracks.length + newFiles.length > 2) return;
    setTracks((prev) => [...prev, ...newFiles]);
  };

  const progress = (tracks.length / 2) * 100;

  return (
    <div className="upload-page">
      {/* Header */}
      <div className="top-bar">
        <div className="logo-title">
          <img src={logo} className="logo-image" alt="AfroCommunity Logo" />
          <h1>Upload</h1>
        </div>
        <div className="close-btn">✕</div>
      </div>

      {/* Progress */}
      <div className="progress-section">
        <span>Tracks Uploaded</span>
        <div className="progress-line">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span>{tracks.length} / 2</span>
      </div>

      {/* Text */}
      <p className="info-text">
        To activate your DJ account you must upload <b>2 tracks</b>.<br />
        Afro will review them before approving your profile.
      </p>

      {/* Upload Box */}
      <div
        className="drop-zone"
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="downloadimg">
          <img src={downloadimg} alt="downloadimg" />
        </div>
        <p>Drag and drop audio files to get started.</p>

        <label className="upload-btn">
          Upload Track
          <input
            type="file"
            hidden
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            />
        </label>

        <p className="remaining">Remaining uploads: {2 - tracks.length}</p>
      </div>

      {/* Tips */}
      <div className="tips">
        <h4>TIPS FOR FASTER APPROVAL</h4>
        <ul>
          <li>Upload high quality audio (WAV, MP3 320kbps)</li>
          <li>Make sure the track is your own or you have the rights</li>
          <li>Avoid copyrighted commercial music</li>
          <li>Add a clear title and genre</li>
        </ul>
      </div>

      {console.log("hellooo")}
    </div>
  );
}
