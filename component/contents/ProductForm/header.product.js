import React from "react";
import '../Css/product.css';

const Header = () => {
  return (
    <div className="header">
      <img
        src="https://diem10cong.edu.vn/image/catalog/cackhoahoc/ky-nang-hoc-tap-diem-10-cong.jpg"
        alt="Coffee beans"
        className="store-logo object-cover"
      />
      <div className="info">
        <h1>Daily Dictation</h1>
        <p>Work And Learn</p>
        <p className="direction">
          <i className="fas fa-map-marker-alt"></i>Every new word is a new discovery. Let us be your companion on your spelling journey.
        </p>
      </div>
    </div>
  );
};

export default Header;
