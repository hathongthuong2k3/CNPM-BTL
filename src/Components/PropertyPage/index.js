import PropertyContent from "../PropertyContent";
import Footer from "../Footer";
import Header from "../Header";
import classNames from "classnames/bind";
import styles from "./PropertyPage.module.css";
const cx = classNames.bind(styles);
function PropertyPage() {
    return (
        <div className={cx("wrapper")}>
        <Header
          className={cx("header")}
          currentPage={"In tài liệu"}
          username={"Thai Bao Long"}
        />
        <PropertyContent className={cx("propertycontent")} />
        <Footer className={cx("footer")} />
      </div>
    );
}

export default PropertyPage;




