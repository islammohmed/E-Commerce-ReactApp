import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      let page = 1;
      let allProducts = [];
      let hasMoreData = true;

      try {
        while (hasMoreData) {
          const { data } = await axios.get(`${baseUrl}/product?page=${page}`);
          allProducts = [...allProducts, ...data.product];
          page++;
          hasMoreData = data.product.length > 0;
        }
        setProducts(allProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getAllProducts();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="my-5 container">
      <h3>Shop Popular Products</h3>
      <div className="row">
        <Product products={products} />
      </div>
    </div>
  );
};

export default Products;
