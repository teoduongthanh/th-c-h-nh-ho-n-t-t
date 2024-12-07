
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { isJsonString } from "./utils";
import * as UserServices from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "./redux/slide/userSlide";
import { Fragment, useEffect, useState } from 'react';
import DefaultPageWeb from './pages/DefaultPageWeb.view';
import { routes } from './routes';


function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    // Xữ lý token hết hạn
    const { storageData, decode } = handleDecoded();
    if (decode?.user_id) {
      handleGetDetailsUser(decode?.user_id, storageData);
    }
    setLoading(false);
  }, []);
// giải mã đoạn code token trong localStorage
  const handleDecoded = () => {
    // Xữ lý token hết hạn
    let storageData = localStorage.getItem("access_token");
    let decode = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decode = jwtDecode(storageData);
    }
    return { storageData, decode };
  };

  UserServices.axiosJWT.interceptors.request.use(
    async function (config) {
      const currentime = new Date();
      const { storageData, decode } = handleDecoded();

      if (decode?.exp < currentime.getTime() / 1000) {
        const data = await UserServices.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetaisUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    // <Router>
    //   <Header />
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/product" element={<ProductIndex />} />
    //       <Route path="/exercises/:topic_id" element={<Exercises />} />
    //       <Route
    //         path="/exercise-segments/:segment_id"
    //         element={<ProductDetail />}
    //       />
    //       <Route path="/contact" element={<Contact />} />
    //       <Route path="/profile" element={<Profile />} />
    //       <Route path="/about" element={<AboutPage />} />
    //     </Routes>
    //   <Footer />

    //   <Routes>
    //     <Route path="/login" element={<LoginIndex />} />
    //     <Route path="/sign-up" element={<SignUpIndex />} />
    //     <Route path="/forgot-password" element={<ForgotPassword />} />
    //     <Route path="/change-password" element={<ChangePassword />} />
    //   </Routes>
    // </Router>
    <div>
    <Routes>
      {routes.map((route, index) => {
        const Page = route.page;
        const Layout = route?.isShowHeader ? DefaultPageWeb : Fragment;
        return (
          <Route
            key={route?.path}
            path={route?.path}
            element={
              <Layout>
                {" "}
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  </div>
  );
}

export default App;
