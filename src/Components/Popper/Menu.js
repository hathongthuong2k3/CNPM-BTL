import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function Menu() {
  return (
    <div className={cx("wrapper")}>
      <Link to={"/changepassword"} className={cx("change-pass")}>
        Đổi mật khẩu
      </Link>

      <Link to={"/payment"} className={cx("payment")}>
        Phương thức thanh toán
      </Link>
      <Link to={"/"} className={cx("logout")}>
        Đăng xuất
      </Link>
    </div>
  );
}

export default Menu;
