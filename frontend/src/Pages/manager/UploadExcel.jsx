// import { useState } from "react";
// import axios from "axios";

// export default function UploadExcel() {
//   const [file, setFile] = useState(null);

//   const upload = async () => {
//     if (!file) return alert("Select file");

//     const formData = new FormData();
//     formData.append("file", file);

//     await axios.post("http://localhost:5000/api/manager/upload", formData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     alert("Leads uploaded successfully");
//   };

//   return (
//     <>
//       <h2>Upload Leads (Excel)</h2>
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <button className="upload-btn" onClick={upload}>
//         Upload
//       </button>
//       <p>Columns: Name, Mobile, Course, Source</p>
//     </>
//   );
// }
import { useState } from "react";
import axios from "axios";
import "./manager.css";

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
    setFile(null);
  };

  // return (
  //   <div className="upload-container">
  //     <h2 className="upload-title">Upload Leads (Excel)</h2>

  //     <label className="file-box">
  //       <input
  //         type="file"
  //         accept=".xlsx,.xls"
  //         onChange={(e) => setFile(e.target.files[0])}
  //       />
  //       <span>{file ? file.name : "Choose Excel File"}</span>
  //     </label>

  //     <button className="upload-btn" onClick={upload}>
  //       Upload
  //     </button>

  //     <p className="upload-info">
  //       Columns: <b>Name, Mobile, Course, Source</b>
  //     </p>
  //   </div>
  // );
  return (
    <div className="upload-page">
      <div className="upload-container">
        <h2 className="upload-title">Upload Leads (Excel)</h2>

        <label className="file-box">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span>{file ? file.name : "Choose Excel File"}</span>
        </label>

        <button className="upload-btn" onClick={upload}>
          Upload
        </button>

        <p className="upload-info">
          Columns: <b>Name, Mobile, Course, Source</b>
        </p>
      </div>
    </div>
  );
}
