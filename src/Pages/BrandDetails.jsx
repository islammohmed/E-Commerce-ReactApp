import React from "react";
import { useParams } from "react-router-dom";

export default function BrandDetails() {
  const { id } = useParams();

  return (
    <div className="container py-5">
      <h2>Brand Details Page</h2>
      <p>Brand ID: {id}</p>
      {/* Fetch and display brand-specific products here */}
    </div>
  );
}
