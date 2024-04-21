import ItemListContainer from "./pages/ItemListContainer/ItemListContainer";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/ThemeConfig/ThemeConfig";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ItemDetailContainer from "./pages/ItemDetail/ItemDetailContainer";
import CartContextProvider from "./context/CartContext";
import CheckoutContainer from "./pages/Checkout/CheckoutContainer";
import LoginContainer from "./pages/Login/LoginContainer";
import RegisterContainer from "./pages/Register/RegisterContainer";
import UserContextProvider from "./context/UserContext";
import MyTickets from "./pages/MyTickets/MyTickets";
import AddProductsContainer from "./pages/AddProducts/AddProductsContainer";
import Profile from "./pages/Profile/Profile";
import Navbar from "./layout/Nabvar/Navbar";
import CartContainer from "./pages/Cart/CartContainer";
import GithubAuth from "./pages/GithubAuth/GithubAuth";

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
                  <Route path="/addProducts" element={<AddProductsContainer />} />
                </Route>
                <Route path="/login" element={<LoginContainer />}></Route>
                <Route path="/register" element={<RegisterContainer />}></Route>
                <Route path="/auth/*" element={<GithubAuth />}></Route>
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
