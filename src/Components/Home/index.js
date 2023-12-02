import Contents from "../Contents";
import Footer from "../Footer";
import Header from "../Header";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);
function Home() {
  return (
    <div className={cx("wrapper")}>
      <Header
        className={cx("header")}
        currentPage={"Trang chủ"}
        username={"Nguyen Tuan Khanh"}
      />
      <Contents className={cx("content")} />
      <Footer className={cx("footer")} />
    </div>
  );
}

export default Home;
