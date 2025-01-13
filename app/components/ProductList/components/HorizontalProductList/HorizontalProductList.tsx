import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { formatPrice } from "~/helpers/helpers";
import { ProductListItem } from "~/models/Product.model";
import { FaChevronRight } from "react-icons/fa";
import "./HorizontalProductList.scss";

export default function HorizontalProductList() {
  const loaderData = useLoaderData<{
    horizontalProductList: ProductListItem[];
  }>();

  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleProductClick = (product: ProductListItem) => {
    const code = product.code;
    navigate(`/details/${code}`);
  };

  return (
    <div id="horizontal-product-list">
      <div className="slider-container">
        <div
          className="slider"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {loaderData.horizontalProductList.map((product) => (
            <div
              key={product.code}
              className="slide"
              onClick={() => handleProductClick(product)}
            >
              <div className="price-badge">%{product.dropRatio}</div>
              <div className="product-content">
                <img src={product.imageUrl} alt={product.name} />
                <div className="product-info">
                  <p className="product-name">{product.name}</p>
                  <div className="price-details">
                    <p className="product-price">
                      {formatPrice(product.price)}
                    </p>
                    <div className="count-of-price-details">
                      <p className="product-count-of-price">
                        {product.countOfPrices} satıcı
                      </p>
                      <FaChevronRight />
                    </div>
                  </div>
                  <p className="product-follow-count">
                    {product.followCount}+ takip
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dots-container">
        {loaderData.horizontalProductList.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="dot"
            style={{
              backgroundColor: index === currentSlide ? "#247ec5" : "#ccc",
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}
