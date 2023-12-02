import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import SPSSLogo from "~/Components/images/SPSS-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function Header({ currentPage }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("page-info")}>
        <Link to={"/"} className={cx("home")}>
          <img src={SPSSLogo} alt="123" className={cx("logo")}></img>
        </Link>
        <h2 className={cx("current-page")}>{currentPage}</h2>
        <FontAwesomeIcon icon={faAngleDoubleRight} className={cx("icon")} />
      </div>
    </div>
  );
}
export default Header;
