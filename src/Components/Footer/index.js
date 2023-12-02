import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import BK from "../images/logoBK.svg";
import VN from "../images/flagvietnam.svg";
const cx = classNames.bind(styles);
function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("footer")}>
        Copyright 2023 Trường Đại Học Bách Khoa - ĐHQG TP.HCM.
        <br /> All Rights Reserved.
        <br />
        Địa chỉ: Đông Hòa, TP Dĩ An, Bình Dương.
      </div>
      <div className={cx("flag")}>
        <img src={BK} alt={""} className={cx("bk")}></img>
        <img src={VN} alt="" className={cx("vn")}></img>
      </div>
    </div>
  );
}

export default Footer;
