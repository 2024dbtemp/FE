import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import MenuDetail from "./components/MenuDatail";
import Cart from "./components/Cart";
import MyOrder from "./components/MyOrder";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPrice, setSearchPrice] = useState({ min: "", max: "" });

  const handleSearch = (term, price) => {
    setSearchTerm(term);
    setSearchPrice(price);
  };

  return (
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
                <Home searchTerm={searchTerm} searchPrice={searchPrice} />
              }
            />
          </Route>
          <Route element={<Header showSearchBar={false} />}>
            <Route path="/menu/:name" element={<MenuDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myorder" element={<MyOrder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
