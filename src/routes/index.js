//Route đưa người dùng tới các trang khi chưa đăng nhập
import ConfirmPage from "~/Components/CofirmPage";
import Home from "~/Components/Home";
import Login from "~/Components/Login";
import Print from "~/Components/Print";
import SendcodePage from "~/Components/SendcodePage";
import PropertyPage from "~/Components/PropertyPage";
export const publicRoutes = [
  { path: "/", component: Home },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/print",
    component: Print,
  },
  {
    path: "/sendcode",
    component: SendcodePage,
  },
  {
    path: "/confirmPrint",
    component: ConfirmPage,
  },
  {
    path: "/property",
    component: PropertyPage,
  },
];

//Route đưa người dùng tới các trang khi đã đăng nhập
export const privateRoutes = [];