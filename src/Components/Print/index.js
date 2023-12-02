import Footer from "../Footer";
import Header from "../Header";
import classNames from "classnames/bind";
import styles from "./Print.module.scss";
import Dropzone from "../Dropzone";
const cx = classNames.bind(styles);
function Print() {
    return (
      <div className={cx("wrapper")}>
        <Header
          className={cx("header")}
          currentPage={"In tài liệu"}
          username={"Thai Bao Long"}
        />
        <Dropzone className={cx("dropzone")} />
        <Footer className={cx("footer")} />
      </div>
    );
  }
  
  export default Print;