import axios from "axios";
import { useNavigate} from "react-router-dom";
import { useState, useEffect} from "react";
import styles from "./Sendcode.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Sendcode() {
  const navigate = useNavigate();
  const [generatedCode, setGeneratedCode] = useState('');
    const [randomCode, setRandomCode] = useState('');
    const [combinedData, setCombinedData] = useState([]);
    useEffect(() => {
      generateCode();
    }, []); // Gọi generateCode khi component được mount
  
    const generateCode = () => {
      const code = Math.floor(100000 + Math.random() * 900000); // Tạo số ngẫu nhiên có 6 chữ số
      setRandomCode(code.toString()); // Chuyển số thành chuỗi để hiển thị
      // Lưu mã ngẫu nhiên vào cơ sở dữ liệu MongoDB
      saveCodeToDatabase(code);
    };
      const saveCodeToDatabase = async (code) => {
        try {
          await axios.post('http://localhost:3001/save-code', { code });
        } catch (error) {
          console.error('Error saving code to database:', error);
        }
      }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('main-content')}>
        <div className={cx('introduce')}>NHẬN YÊU CẦU THÀNH CÔNG!</div>
        <div className={cx("code")}>
      <h2>Mã xác nhận:</h2>
      {randomCode && (
        <div>
          <p>{randomCode}</p>
        </div>
      )}
    </div>
    <div className={cx("actions")}>
            <button className={cx("Upload")} onClick={() => navigate("/")}>
              Trở về trang chủ
            </button> 
          </div>
      </div>
    </div>
  );
};
export default Sendcode;