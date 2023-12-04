import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Popper from "../Popper";
import SPSSLogo from "~/Components/images/SPSS-logo.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function Header({ currentPage }) {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Check user's authentication status on component mount
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsLogin(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear authentication status and username from local storage on logout
    localStorage.removeItem('username');
    setIsLogin(false);
    setUsername('');
    navigate("/");
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("page-info")}>
        <Link to={"/"} className={cx("home")}>
          <img src={SPSSLogo} alt="123" className={cx("logo")}></img>
        </Link>
        <h2 className={cx("current-page")}>{currentPage}</h2>
        <FontAwesomeIcon icon={faAngleDoubleRight} className={cx("icon")} />
      </div>
      <div className={cx("user-info")}>
        <div className={cx("pop-up")}>
          {isLogin ? (
            <>
              <span>Hello, {username}</span>
              <button className={cx("logout")} onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <Link className={cx("login")} to={"/login"}>
              Đăng nhập
            </Link>
          )}
        </div>
        <div className={cx("separate")} />
        <Link className={cx("usage")} to={"/usage"}>
          Hướng dẫn sử dụng
        </Link>
      </div>
    </div>
  );
}

export default Header;
