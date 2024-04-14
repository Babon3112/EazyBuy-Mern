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

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/success"
          element={user ? <Success /> : <Navigate to="/" />}
        />
        <Route path="/productlist/:category" element={<ProductList />} />
        <Route
          path="/your-account"
          element={user ? <YourAccount /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
