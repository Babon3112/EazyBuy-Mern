import "./product.css";
import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PublishIcon from "@mui/icons-material/Publish";
import { userRequest } from "../../requestMethod";
import Chart from "../../components/chart/Chart";
import { upadateProduct } from "../../redux/apiCalls";

export default function Product() {
  const [productImage, setProductImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [inStock, setInStock] = useState(true);
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const dispatch = useDispatch();

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(
          `orders/monthly-income?pid=${productId}`
        );
        const list = res.data.data.sort((a, b) => a._id - b._id);
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProductImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (productImage) formData.append("productImage", productImage);
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (price) formData.append("price", price);
    if (categories)
      categories.forEach((category) =>
        formData.append("categories[]", category)
      );
    if (color) color.forEach((color) => formData.append("color[]", color));
    if (size) size.forEach((size) => formData.append("size[]", size));
    if (inStock) formData.append("inStock", inStock === "true" ? true : false);

    await upadateProduct(productId, formData, dispatch);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product Details</h1>
        <Link to="/newproduct" className="link">
          <button className="productAddButton">Create New Product</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.image} alt="product" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Total Sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">In Stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              defaultValue={product.title}
              className="inputField"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="productDesc">Product Description</label>
            <input
              type="text"
              id="productDesc"
              defaultValue={product.description}
              className="inputField"
              onChange={(e) => setDecription(e.target.value)}
            />
            <label htmlFor="productCategories">Categories</label>
            <input
              type="text"
              id="productCategories"
              defaultValue={product.categories}
              className="inputField"
              onChange={handleCategories}
            />
            <label htmlFor="productColor">Color</label>
            <input
              type="text"
              id="productColor"
              defaultValue={product.color}
              className="inputField"
              onChange={handleColor}
            />
            <label htmlFor="productSize">Size</label>
            <input
              type="text"
              id="productSize"
              defaultValue={product.size}
              className="inputField"
              onChange={handleSize}
            />
            <label htmlFor="productPrice">Price</label>
            <input
              type="text"
              id="productPrice"
              defaultValue={product.price}
              className="inputField"
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="inStock">In Stock</label>
            <select
              id="inStock"
              className="inputField"
              onChange={(e) => setInStock(e.target.value)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            {productImage ? (
              <>
                {" "}
                <img
                  src={productImage}
                  alt="Product"
                  className="productUploadImg"
                />
                <label htmlFor="file" className="uploadButton">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="productImage" style={{ cursor: "pointer" }}>
                      Change Image
                      <PublishIcon />
                    </label>
                    <input
                      id="productImage"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </div>
                </label>
              </>
            ) : (
              <>
                <img
                  src={product.image}
                  alt="upload"
                  className="productUploadImg"
                />
                <label htmlFor="file" className="uploadButton">
                  <div>
                    <label
                      htmlFor="productImage"
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Change Image
                      <PublishIcon />
                    </label>
                    <input
                      id="productImage"
                      type="file"
                      accept="image/*,video/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </div>
                </label>
              </>
            )}
            <button className="productButton" onClick={handleUpdate}>
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
