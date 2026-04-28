// import React from 'react'
// import Logo_bold_without_name from "../../assets/logo/Logo_bold_without_name.svg"
// import logo from "../../assets/logo/logo.png"

// function Upload() {
//     return (
//         <>
//             <img src={logo} className="logo" alt="AfroCommunity Logo" />
//             <h1>hi basset welcome hhh hhh hhh</h1>
//         </>
//     )
// }

// export default Upload

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
    <div className="page">
      <div className="card">
        
        {/* Header */}
        <div className="header">
          <h2>Upload</h2>
          <span className="close">✕</span>
        </div>

        {/* Progress */}
        <div className="progress-box">
          <div className="progress-text">
            <span>Tracks Uploaded</span>
            <span>{tracks.length} / 2</span>
          </div>
          <div className="bar">
            <div className="fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Text */}
        <p className="desc">
          To activate your DJ account you must upload <b>2 tracks</b>.
        </p>

        {/* Upload box */}
        <div
          className="upload-box"
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <p>Drag & drop audio files</p>

          <label className="btn">
            Upload Track
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>

          <p className="remaining">
            Remaining uploads: {2 - tracks.length}
          </p>
        </div>

        {/* Tips */}
        <div className="tips">
          <p>Tips for faster approval</p>
          <ul>
            <li>High quality audio</li>
            <li>Your own work</li>
            <li>No copyrighted music</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
