import { useState } from "react";
import axios from "axios";

export default function UploadExcel() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/api/manager/upload", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Leads uploaded successfully");
  };

  return (
    <>
      <h2>Upload Leads (Excel)</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="upload-btn" onClick={upload}>
        Upload
      </button>
      <p>Columns: Name, Mobile, Course, Source</p>
    </>
  );
}
