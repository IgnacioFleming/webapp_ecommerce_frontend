import "./App.css";
import Navbar from "./components/Nabvar/Navbar.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import { ThemeProvider } from "@emotion/react";
import theme from "./components/ThemeConfig/ThemeConfig";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";
import CartContainer from "./components/Cart/CartContainer";
import CartContextProvider from "./context/CartContext";
import CheckoutContainer from "./components/Checkout/CheckoutContainer";
import Login from "./components/Login/Login.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CartContextProvider>
            <Routes>
              <Route element={<Navbar />}>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/category/:categoryName" element={<ItemListContainer />} />
                <Route path="/itemDetail/:id" element={<ItemDetailContainer />} />
                <Route path="/cart" element={<CartContainer />} />
                <Route path="/checkout" element={<CheckoutContainer />} />
              </Route>
              <Route path="/login" element={<Login />}></Route>
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
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
