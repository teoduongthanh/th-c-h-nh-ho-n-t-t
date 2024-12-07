import LoginIndex from "../component/views/login.view";
import ProductIndex from "../component/views/product.view";
import SignUpIndex from "../component/views/signup.view";
import Contact from "../components/Contact/Contact";
import Home from "../pages/HomePage";
import ProductDetail from "../pages/ProductDetail";
import Exercises from "../component/contents/ProductForm/exercises";
import Profile from "../pages/Profile";
import AboutPage from "../pages/AboutPage";

import ForgotPassword from "../component/contents/LoginForm/forgotpasswordForm";
import ChangePassword from "../component/contents/LoginForm/changepasswordForm";
// muốn them header và footer thì chỉnh isShowHeader true
export const routes = [
  {
    path: "/",
    page: Home,
    isShowHeader: true,
  },
  {
    path: "/product",
    page: ProductIndex,
    isShowHeader: true,
  },
  {
    path: "/exercises/:topic_id",
    page: Exercises,
    isShowHeader: true,
  },
  {
    path: "/exercise-segments/:segment_id",
    page: ProductDetail,
    isShowHeader: true ,
  },
  {
    path: "/contact",
    page: Contact,
    isShowHeader: true,
  },
  {
    path: "/profile",
    page: Profile,
    isShowHeader: true,
  },
  {
    path: "/about",
    page: AboutPage,
    isShowHeader: true,
  },
  {
    path: "/login",
    page: LoginIndex,
    isShowHeader: false,
  },
  {
    path: "/signup",
    page: SignUpIndex,
    isShowHeader: false,
  },
  {
    path: "/forgot-password",
    page: ForgotPassword,
    isShowHeader: false,
  },
  {
    path: "/change-password",
    page: ChangePassword,
    isShowHeader: false,
  },
];
