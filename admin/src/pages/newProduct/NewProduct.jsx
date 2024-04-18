import { useState } from "react";
import "./newProduct.css";
import { createProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [productImage, setProductImage] = useState(null);
  const [inputs, setInputs] = useState({});
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!productImage) {
      console.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("price", inputs.price);
    categories.forEach((category) => formData.append("categories[]", category));
    color.forEach((color) => formData.append("color[]", color));
    size.forEach((size) => formData.append("size[]", size));
    formData.append("inStock", inputs.inStock === "true" ? true : false);

    await createProduct(formData, dispatch).then((res) =>
      window.location.reload()
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" encType="multipart/form-data">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            accept="image/*,video/*"
            onChange={(e) => setProductImage(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Product Name"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="description"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="enter product categories"
            onChange={handleCategories}
          />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input
            type="text"
            placeholder="enter product colors"
            onChange={handleColor}
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input
            type="text"
            placeholder="enter product sizes"
            onChange={handleSize}
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleCreate} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
