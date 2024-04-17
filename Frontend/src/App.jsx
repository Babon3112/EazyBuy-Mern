import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import Success from "./Pages/Success";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import YourAccount from "./Pages/YourAccount";
import ChangePassword from "./Pages/ChangePassword";
import DeleteAccount from "./Pages/DeleteAccount";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const accessToken = user?.data.accessToken;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/productlist/:category" element={<ProductList />} />
        <Route
          path="/login"
          element={accessToken ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={accessToken ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/success"
          element={accessToken ? <Success /> : <Navigate to="/" />}
        />
        <Route
          path="/your-account"
          element={accessToken ? <YourAccount /> : <Navigate to="/" />}
        />
        <Route
          path="/change-password"
          element={accessToken ? <ChangePassword /> : <Navigate to="/" />}
        />
        <Route
          path="/delete-account"
          element={accessToken ? <DeleteAccount /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
