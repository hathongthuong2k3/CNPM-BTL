import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Dropzone.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
const Dropzone = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:3001/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };
  const [files, setFiles] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:3001/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {
      navigate("/property");
      alert("Tải lên thành công");
      getPdf();
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("main-content")}>
        <div className={cx("introduce")}>TẢI TỆP LÊN</div>
        <div className={cx("drop")}>
          <FontAwesomeIcon icon={faCloudArrowUp} className={cx("icon")} />
          <h1>Upload Your Files Here</h1>
          <form className="formStyle" onSubmit={handleUpload}>
            <input
              type="file"
              class="form-control"
              accept="application/pdf"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
          </form>
        </div>
        <div className={cx("actions")}>
          <button className={cx("cancel")} onClick={() => navigate("/")}>
            HỦY
          </button>
          <button className={cx("Upload")} onClick={handleUpload}>
            XÁC NHẬN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
