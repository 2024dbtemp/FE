import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import MenuDetail from "./components/MenuDatail";
import Cart from "./components/Cart";
import MyOrder from "./pages/MyOrder";
import OrderDetail from "./components/OrderDetail";
import AdminHeader from "./components/AdminHeader";
import MenuList from "./pages/MenuList";
import AdminTotalSales from "./pages/AdminTotalSales";
import SalesPerMemeber from "./pages/SalesPerMember";
import SalesByFood from "./pages/SalesByFood";

function App() {
  //SearchBar 컴포넌트를 통해 메뉴들을 필터링 할 검색어와 가격을 받는 부분
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPrice, setSearchPrice] = useState({ min: "", max: "" });

  //검색을 처리해주기 위한 부분으로, 입력으로 들어온 값을 동적으로 바꿔주기 위함
  const handleSearch = (term, price) => {
    setSearchTerm(term);
    setSearchPrice(price);
  };

  return (
    //해당 부분은 컴포넌트에 path를 부여해 클릭 시에 원하는 페이지로 이동함
    //컴포넌트를 통해 전달한 값들은 해당 컴포넌트에서 필요한 데이터들을 props로 전달받아 사용할 수 있게 하기 위함.
    <div className="App">
      <BrowserRouter basename="/C-ON">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            element={<Header onSearch={handleSearch} showSearchBar={true} />}
          >
            <Route
              path="/"
              element={
                <MenuList searchTerm={searchTerm} searchPrice={searchPrice} />
              }
            />
          </Route>
          <Route element={<Header showSearchBar={false} />}>
            <Route path="/menu/:name" element={<MenuDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/orders/:cartId" element={<OrderDetail />} />
          </Route>
          {/* AdminHeader에서 메뉴 없애면 여기서부터 */}
          <Route
            element={
              <AdminHeader onSearch={handleSearch} showSearchBar={true} />
            }
          >
            <Route
              path="/admin"
              element={
                <MenuList searchTerm={searchTerm} searchPrice={searchPrice} />
              }
            />
            {/* 야기까지 다 없애도 돼 */}
          </Route>
          <Route element={<AdminHeader showSearchBar={false} />}>
            <Route path="/admin/sales" element={<AdminTotalSales />} />
            <Route path="/admin/sales/member" element={<SalesPerMemeber />} />
            <Route path="/admin/sales/food" element={<SalesByFood />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
