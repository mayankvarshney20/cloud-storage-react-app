import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      console.log('No file selected');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log('Uploading file to server...');
      const response = await axios.post("http://40.86.181.37/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploading(false);
      console.log('Server response:', response.data);
      console.log(response.data);
    } catch (err) {
      setUploading(false);
      setError('Error uploading file.');
      console.error('Error uploading file:', err.response || err.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default FileUpload;
