import React from "react";
import { useParams } from "react-router-dom";

export default function CategoryDetails() {
  const { id } = useParams();

  return (
    <div className="container py-5">
      <h2>Category Details Page</h2>
      <p>Category ID: {id}</p>
      {/* Here you can fetch and display category-specific products */}
    </div>
  );
}
