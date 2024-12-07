import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./productcard.product";
import "../Css/product.css";

const ProductGrid = () => {
    const [products, setProducts] = useState([]); // Dữ liệu sản phẩm từ API
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const [levelFilter, setLevelFilter] = useState("all"); // Lọc theo mức độ
    const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm

    // Gọi API khi component được render
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/topics"); // Địa chỉ API
                setProducts(response.data); // Ghi dữ liệu từ API vào state
                setLoading(false); // Dừng trạng thái tải
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Không thể tải dữ liệu, vui lòng thử lại sau.");
                setLoading(false); // Dừng trạng thái tải
            }
        };

        fetchData();
    }, []);

    // Xử lý khi tải hoặc có lỗi
    if (loading) return <div className="loading">Đang tải dữ liệu...</div>;
    if (error) return <div className="error text-red-500">{error}</div>;

    // Hàm xử lý thay đổi mức độ lọc
    const handleLevelFilterChange = (event) => {
        setLevelFilter(event.target.value);
    };

    // Hàm lọc sản phẩm theo mức độ và từ khóa tìm kiếm
    const filteredProducts = () => {
        let filtered = [...products];

        // Lọc theo mức độ
        if (levelFilter !== "all") {
            filtered = filtered.filter(
                (product) => product.level.toLowerCase() === levelFilter
            );
        }

        // Lọc theo từ khóa tìm kiếm
        if (searchQuery) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    // Xử lý sự kiện thay đổi từ khóa tìm kiếm
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="products">
            <div className="controls">
                <div className="search-container">
                    <i className="fas fa-search icon-search"></i>
                    <input
                        type="search"
                        placeholder="Tìm kiếm sản phẩm"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <select onChange={handleLevelFilterChange} value={levelFilter}>
                    <option value="all">Tất cả mức độ</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div className="grid">
                {filteredProducts().map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;