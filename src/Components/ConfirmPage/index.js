import Confirm from "../Confirm";
import Footer from "../Footer";
import Header from "../Header";
import classNames from "classnames/bind";
import styles from "./CofirmPage.module.scss";
const cx = classNames.bind(styles);
function ConfirmPage() {
  return (
    <div className={cx("wrapper")}>
      <Header
        className={cx("header")}
        currentPage={"Trang chủ"}
        username={"Nguyen Tuan Khanh"}
      />
      <Confirm className={cx("confirm")} />
      <Footer className={cx("footer")} />
    </div>
  );
}

export default ConfirmPage;
