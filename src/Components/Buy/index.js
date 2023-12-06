import styles from "./Buy.module.scss";
import classNames from "classnames/bind";
import Header from "../Header";
import Footer from "../Footer";
import BuyContent from "../BuyContent";
import * as React from "react";
const cx = classNames.bind(styles);
function Buy() {
  return (
    <div className={cx("wrapper")}>
      <Header classNames={cx("header")} currentPage={"Mua thêm trang in"} />
      <br />
      <br />
      <BuyContent />
      <Footer />
    </div>
  );
}

export default Buy;
