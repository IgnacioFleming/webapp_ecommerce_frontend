import "./App.css";
import Navbar from "./components/Nabvar/Navbar.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import { ThemeProvider } from "@emotion/react";
import theme from "./components/ThemeConfig/ThemeConfig";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";
import CartContainer from "./components/Cart/CartContainer";
import CartContextProvider from "./context/CartContext";
import CheckoutContainer from "./components/Checkout/CheckoutContainer";
import LoginContainer from "./components/Login/LoginContainer.jsx";
import RegisterContainer from "./components/Register/RegisterContainer.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import Profile from "./components/Profile/Profile.jsx";
import MyTickets from "./components/MyTickets/MyTickets.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserContextProvider>
            <CartContextProvider>
              <Routes>
                <Route element={<Navbar />}>
                  <Route path="/" element={<Navigate to="/products" />} />
                  <Route path="/products" element={<ItemListContainer />} />
                  <Route path="/products/category/:categoryName" element={<ItemListContainer />} />
                  <Route path="/itemDetail/:id" element={<ItemDetailContainer />} />
                  <Route path="/cart" element={<CartContainer />} />
                  <Route path="/checkout" element={<CheckoutContainer />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/tickets" element={<MyTickets />} />
                </Route>
                <Route path="/login" element={<LoginContainer />}></Route>
                <Route path="/register" element={<RegisterContainer />}></Route>
                <Route
                  path="*"
                  element={
                    <h1
                      style={{
                        textAlign: "center",
                        fontSize: 50,
                        paddingTop: 30,
                      }}
                    >
                      La Pagina buscada no existe
                    </h1>
                  }
                />
              </Routes>
            </CartContextProvider>
          </UserContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
