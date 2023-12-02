import Header from "./Header";
import classNames from "classnames/bind";
import styles from "./Popper.module.scss";

const cx = classNames.bind(styles);
function Popper({ username }) {
  return (
    <div className={cx("wrapper")}>
      <Header username={username} className={cx("header")} />
    </div>
  );
}

export default Popper;
