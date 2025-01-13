import { useNavigate } from "@remix-run/react";
import { ProductListItem } from "~/models/Product.model";
import "./VerticalProductList.scss";
import { formatPrice } from "~/helpers/helpers";
import { FaChevronRight } from "react-icons/fa";

interface IVerticalProductListProps {
  productList: ProductListItem[];
}

export default function VerticalProductList({
  productList,
}: IVerticalProductListProps) {
  const navigate = useNavigate();

  const handleProductClick = (product: ProductListItem) => {
    const code = product.code;
    navigate(`/details/${code}`);
  };

  return (
    <div id="vertical-product-list">
      {productList.map((product) => (
        <div
          className="product-card"
          key={product.code}
          onClick={() => handleProductClick(product)}
        >
          <div className="price-badge">%{product.dropRatio}</div>
          <div className="product-content">
            <div className="image-container">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <div className="price-details">
                <p className="product-price">{formatPrice(product.price)}</p>
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
  );
}
