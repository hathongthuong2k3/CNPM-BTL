import axios from "axios";
import { useNavigate} from "react-router-dom";
import { useState, useEffect} from "react";
import styles from "./Confirm.module.scss";
import classNames from "classnames/bind";
import { get } from "mongoose";
const cx = classNames.bind(styles);
function Confirm () {
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);
    useEffect(() => {
      // Gửi yêu cầu GET đến API để lấy dữ liệu từ cơ sở dữ liệu
      axios.get('http://localhost:3000/getFormData')
        .then((response) => {
          if (response.data.status === 'ok') {
            setFormData(response.data.data);
          } else {
            console.error('Error fetching data:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
    const latestFormData = formData.slice(-1)[0];
    return (
        <div className={cx("wrapper")}>
          <div className={cx("main-content")}>
              <div className={cx("introduce")}>XÁC NHẬN</div>
              <div className={cx("confirm")}>
                <h3>THÔNG SỐ IN</h3>
         <div className={cx("display")}>
         <dl>
          <dt>Khổ giấy in: {latestFormData?.selectedPageSize}</dt>
          <dt>Trang in: {latestFormData?.selectedPage}</dt>
          <dt>Máy in: {latestFormData?.selectedPrinter}</dt>
          <dt>Số mặt trên một tờ: {latestFormData?.selectedNumPage}</dt>
      </dl>
        </div>
                </div>
                <div className={cx("actions")}>
            <button className={cx("cancel")} onClick={() => navigate("/")}>
              HỦY
            </button> 
            <button className={cx("Upload")} onClick={() => navigate("/sendcode")}>
              XÁC NHẬN
            </button>
          </div>
            </div>
        </div>
    );
};

export default Confirm;

