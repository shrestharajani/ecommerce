import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./pages/UserPanel/Home";
import { Link } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import FooterPage from "./components/FooterPage";
import AddToCart from "./pages/UserPanel/AddToCart";
import { breadcrumbNameMap } from "./components/BreadCrumbItem";
import { AdminLoginPage } from "./pages/AdminPanel/AdminLoginPage";
import { AdminPage } from "./pages/AdminPanel/AdminPage";
import { Beer } from "./pages/UserPanel/Beer/Beer";
import { BeerDomestic } from "./pages/UserPanel/Beer/BeerDomestic";
import { BeerImported } from "./pages/UserPanel/Beer/BeerImported";
import { Wine } from "./pages/UserPanel/Wine/Wine";
import { WineDomestic } from "./pages/UserPanel/Wine/WineDomestic";
import { WineImported } from "./pages/UserPanel/Wine/WineImported";
import { Brandy } from "./pages/UserPanel/Brandy/Brandy";
import { BrandyDomestic } from "./pages/UserPanel/Brandy/BrandyDomestic";
import { BrandyImported } from "./pages/UserPanel/Brandy/BrandyImported";
import { Whisky } from "./pages/UserPanel/Whiskey/Whisky";
import { WhiskyDomestic } from "./pages/UserPanel/Whiskey/WhiskyDomestic";
import { WhiskyImported } from "./pages/UserPanel/Whiskey/WhiskyImported";
import { Rum } from "./pages/UserPanel/Rum/Rum";
import { RumDomestic } from "./pages/UserPanel/Rum/RumDomestic";
import { RumImported } from "./pages/UserPanel/Rum/RumImported";
import { Vodka } from "./pages/UserPanel/Vodka/Vodka";
import { VodkaDomestic } from "./pages/UserPanel/Vodka/VodkaDomestic";
import { VodkaImported } from "./pages/UserPanel/Vodka/VodkaImported";
import { Kodo } from "./pages/UserPanel/Kodo";
import { FeatureProducts } from "./pages/UserPanel/FeatureProducts";
import History from "./pages/UserPanel/History";
import CheckoutPage from "./pages/UserPanel/Checkout/CheckoutPage";
import Prefooter from "./components/Prefooter";
import CopyRightFooter from "./components/CopyRightFooter";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./redux/actions/authActions";

const { Header, Content, Footer } = Layout;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  if (pathSnippets[0] === "admin") {
    return (
      <Layout style={{ height: "100vh" }}>
        <ToastContainer />
        <Content>
          <Routes>
            <Route path="/admin" element={<AdminLoginPage />}></Route>
            <Route path="/admin/admin-page" element={<AdminPage />}></Route>
          </Routes>
        </Content>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <Header className="header">
          <Navbar />
        </Header>

        <ToastContainer />
        <Content className="ant-content">
          <Breadcrumb className="ant-breadcrumb">{breadcrumbItems}</Breadcrumb>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/add-to-cart" element={<AddToCart />}></Route>
            <Route path="feature-product" element={<FeatureProducts />} />
            <Route path="/beer" element={<Beer />} />
            <Route path="/beer/domestic-beer" element={<BeerDomestic />} />
            <Route path="/beer/imported-beer" element={<BeerImported />} />
            <Route path="/rum" element={<Rum />} />
            <Route path="/rum/domestic-rum" element={<RumDomestic />} />
            <Route path="/rum/imported-rum" element={<RumImported />} />
            <Route path="/vodka" element={<Vodka />} />
            <Route path="/vodka/domestic-vodka" element={<VodkaDomestic />} />
            <Route path="/vodka/imported-vodka" element={<VodkaImported />} />
            <Route path="/whisky" element={<Whisky />} />
            <Route
              path="/whisky/domestic-whisky"
              element={<WhiskyDomestic />}
            />
            <Route
              path="/whisky/imported-whisky"
              element={<WhiskyImported />}
            />
            <Route path="/wine" element={<Wine />} />
            <Route path="/wine/domestic-wine" element={<WineDomestic />} />
            <Route path="/wine/imported-wine" element={<WineImported />} />
            <Route path="/brandy" element={<Brandy />} />
            <Route
              path="/brandy/domestic-brandy"
              element={<BrandyDomestic />}
            />
            <Route
              path="/brandy/imported-brandy"
              element={<BrandyImported />}
            />
            <Route path="/kodo" element={<Kodo />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Content>

        <Footer className="ant-footer">
          <FooterPage />
        </Footer>
        <Prefooter />
        <CopyRightFooter />
      </Layout>
    </>
  );
}

export default App;
