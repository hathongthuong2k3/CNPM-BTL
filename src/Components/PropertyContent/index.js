import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./PropertyContent.module.scss";
import classNames from "classnames/bind";
import { get } from "mongoose";
const cx = classNames.bind(styles);
function PropertyPage() {
  const navigate = useNavigate();
  const [selectedNumPage, setSelectedNumPage] = useState("");
  const [selectedPrinter, setSelectPrinter] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const [selectedPageSize, setSelectedPageSize] = useState("");

  const handleSelectNumPageChange = (event) => {
    setSelectedNumPage(event.target.value);
  };

  const handleSelectPageChange = (event) => {
    setSelectedPage(event.target.value);
  };

  const handleSelectPrinter = (event) => {
    setSelectPrinter(event.target.value);
  };

  const handleSelectPageSizeChange = (event) => {
    setSelectedPageSize(event.target.value);
  };
  const handleSaveData = async () => {
    // Gửi yêu cầu POST lên server

    try {
      const response = await axios.post("http://localhost:3001/saveFormData", {
        selectedNumPage,
        selectedPrinter,
        selectedPage,
        selectedPageSize,
      });
      console.log(response.data);
      navigate("/confirmPrint");
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("main-content")}>
        <div className={cx("introduce")}>CHỌN KHỔ GIẤY</div>
        <div className={cx("uploadarea")}>
          <select
            className={styles.chooseNumPage}
            required={true}
            id="4"
            value={selectedNumPage}
            onChange={handleSelectNumPageChange}
          >
            <option value="0">Chọn sô trang trên 1 mặt</option>
            <option value="1">1</option>
            <option value="4">4</option>
          </select>
          <select
            className={styles.choosePage}
            value={selectedPage}
            onChange={handleSelectPageChange}
          >
            <option value="Chọn số mặt trên một tờ">
              Chọn số mặt trên một tờ
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <select
            className={styles.choosePrinter}
            value={selectedPrinter}
            onChange={handleSelectPrinter}
          >
            <option value="Chọn máy in">Chọn máy in</option>
            <option value="H1-Tầng 1">H1-Tầng 1</option>
            <option value="H1-Tầng 2">H1-Tầng 2</option>
            <option value="H2-Tầng 1">H2-Tầng 1</option>
            <option value="H2-Tầng 2">H2-Tầng 2</option>
            <option value="H3-Tâng 1">H3-Tầng 1</option>
            <option value="H3-Tầng 2">H3-Tầng 2</option>
            <option value="H6-Tầng 1">H6-Tầng 1</option>
            <option value="H6-Tầng 2">H6-Tầng 2</option>
          </select>
          <select
            className={styles.choosePageSize}
            value={selectedPageSize}
            onChange={handleSelectPageSizeChange}
          >
            <option value="Chọn khổ giấy in">Chọn khổ giấy in</option>
            <option value="A0">A0</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="A3">A3</option>
          </select>
        </div>
        <div className={cx("actions")}>
          <button className={cx("cancel")} onClick={() => navigate("/")}>
            HỦY
          </button>
          <button className={cx("Upload")} onClick={handleSaveData}>
            XÁC NHẬN
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyPage;
