import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css"
import Home from "./pages/home/Home";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProducts";
import Login from "./pages/login/Login";

function App() {

  const location = useLocation();

  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).user.isAdmin;
  console.log(admin)

  return (
    <>
      <Routes>
        <Route path="/login" element={ admin ? <Navigate to="/" /> : <Login />} />
      </Routes>
      {/* {location.pathname !== '/login' ? <Topbar /> : null} */}
      {location.pathname !== '/login' ?
        <>
          {admin ? <>
            <Topbar />
            <div className="container">
              {/* {location.pathname !== '/login' ? <Sidebar /> : null} */}
              <Sidebar />
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="users" >
                    <Route index element={<UserList />} />
                    <Route path=":id" element={<User />} />
                    <Route path="new" element={<NewUser />} />
                  </Route>
                  <Route path="products" >
                    <Route index element={<ProductList />} />
                    <Route path=":id" element={<Product />} />
                    <Route path="new" element={<NewProduct />} />
                  </Route>
                </Route>
                {/* <Route path="*" element={<Home />} /> */}
              </Routes>
            </div></> : <Navigate to="/login" />}</> : null}
    </>
  );
}

export default App;
