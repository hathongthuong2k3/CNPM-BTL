import Form from "../Form";
import Header from "./Header";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Footer from "../Footer";
const cx = classNames.bind(styles);

function Login() {
  return (
    <div className={cx("wrapper")}>
      <Header className={cx("header")} currentPage={"Đăng nhập"}></Header>
      <Form className={cx("form")}></Form>
      <Footer />
    </div>
  );
}

export default Login;
