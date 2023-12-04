import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import { useRef, useState } from "react";
import axios from "axios";
const cx = classNames.bind(styles);

function Form() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [focusUserName, setFocusUserName] = useState(false);
  const [focusPassword, setFocusPassWord] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef();
  const userpassRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
  
      const { success, username: loggedInUsername } = response.data;
  
      if (success) {
        // Redirect to the next page or update the state to show the user is logged in
        navigate("/print");
        console.log('Logged in successfully');
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };
  const handleChangeUserName = (e) => {
    console.log(e.target.value);
    setUserName(e.target.value);
  };
  const handleChangeUserPass = (e) => {
    setPassWord(e.target.value);
    console.log(e.target.value);
  };
  const handleFocusUserName = (e) => {
    setFocusUserName(true);
  };
  const handleFocusPassWord = (e) => {
    setFocusPassWord(true);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form-login")}>
        <h1 className={cx("title")}>Đăng nhập</h1>
        <form onSubmit={handleSubmit} className={cx("form")}>
          <div className={cx("form-group")}>
            <input
              className={cx("user-name")}
              type="text"
              placeholder="Tên đăng nhập/Số điện thoại"
              onChange={handleChangeUserName}
              ref={usernameRef}
              name="username"
              required={true}
              onBlur={handleFocusUserName}
              focus={focusUserName.toString()}
            />
            <span className={cx("error-message")}>
              Vui lòng nhập trường này
            </span>
          </div>
          <div className={cx("form-group")}>
            <input
              className={cx("user-password")}
              type="password"
              placeholder="Mật khẩu"
              name="userpassword"
              ref={userpassRef}
              onChange={handleChangeUserPass}
              required={true}
              onBlur={handleFocusPassWord}
              focus={focusPassword.toString()}
            />
            <span className={cx("error-message")}>
              Vui lòng nhập trường này
            </span>
          </div>
          <button className={cx("submit")} onClick = {handleSubmit}>ĐĂNG NHẬP</button>
        </form>
        <div className={cx("more-option")}>
          <a href="#" className={cx("forgotpass")}>
            Quên mật khẩu
          </a>
          <a href="#" className={cx("otp")}>
            Đăng nhập với mã OTP
          </a>
        </div>
      </div>
    </div>
  );
}

export default Form;
