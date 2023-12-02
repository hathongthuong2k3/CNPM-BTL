import Sendcode from "../Sendcode";
import Footer from "../Footer";
import Header from "../Header";
import classNames from "classnames/bind";
import styles from "./SendcodePage.module.scss";
const cx = classNames.bind(styles);
function SendcodePage() {
  return (
    <div className={cx("wrapper")}>
      <Header
        className={cx("header")}
        currentPage={"Trang chủ"}
        username={"Nguyen Tuan Khanh"}
      />
      <Sendcode className={cx("sendcode")} />
      <Footer className={cx("footer")} />
    </div>
  );
}

export default SendcodePage;
