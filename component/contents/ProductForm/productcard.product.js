import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../Css/product.css";

const ProductCard = ({ product }) => {
    const navigate = useNavigate(); // React Router's navigate function

    const handleCardClick = () => {
        if (product.topic_id) {
            navigate(`/exercises/${product.topic_id}`); // Navigate to the exercises page based on topic_id
        }
    };

    return (
        <div
            className="product-card border p-4 rounded shadow cursor-pointer hover:shadow-lg"
            onClick={handleCardClick}
        >
            <img
                src={product.topic_avatar || "default-image.jpg"} // Fallback image if topic_avatar is undefined
                alt={product.name || "Unnamed product"} // Fallback name
                className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-xl font-bold">{product.name || "Unnamed Product"}</h2>
            <p className="text-gray-600">{product.level || "No level available"}</p>
        </div>
    );
};

export default ProductCard;