import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Popper from "../Popper";
import SPSSLogo from "~/Components/images/SPSS-logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
const isLogin = false;
function Header({ currentPage, username }) {
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
            <Popper username={username} />
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
