import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  display: flex;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [productss, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          cat
            ? `/products?category=${cat}`
            : "/products"
        );
        setProducts(res.data.data);
      } catch (error) {}
    };
    
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        productss.filter((product) =>
          Object.entries(filters).every(([key, value]) =>
            product[key].includes(value)
          )
        )
      );
  }, [productss, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.created - b.created)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((product) => (
            <Product product={product} key={product._id} />
          ))
        : productss
            .slice(0, 8)
            .map((product) => <Product product={product} key={product._id} />)}
    </Container>
  );
};

export default Products;
