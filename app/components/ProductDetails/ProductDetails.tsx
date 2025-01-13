import { useLoaderData } from "@remix-run/react";
import { Product } from "~/models/Product.model";
import { formatPrice } from "~/helpers/helpers";
import "./ProductDetails.scss";

export default function ProductDetails() {
  const loaderData = useLoaderData<{
    productDetails: Product;
  }>();

  const renderStars = (rating: number) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => (
      <span
        key={index}
        className="star"
        style={{ color: index < rating ? "gold" : "#ccc" }}
      >
        ★
      </span>
    ));
  };

  return (
    <div id="product-details">
      <img
        src={loaderData.productDetails.imageUrl}
        alt={loaderData.productDetails.productName}
      />
      <div className="product-details-info">
        <p className="product-mkName">
          <small>{loaderData.productDetails.mkName}</small>
        </p>
        <p className="product-name">{loaderData.productDetails.productName}</p>
        <div className="stars">
          <p className="badge">{loaderData.productDetails.badge}</p>
          {renderStars(loaderData.productDetails.rating)}
        </div>
        <div className="options">
          <p>Seçenekler:</p>
          {loaderData.productDetails.storageOptions.map((option, index) => (
            <button key={index}>{option}</button>
          ))}
        </div>
        <p>
          {loaderData.productDetails.countOfPrices} satıcı içerisinde kargo
          dahil en ucuz fiyat seçeneği
        </p>
        <div className="price-details">
          <p className="price">
            {formatPrice(loaderData.productDetails.price)}
          </p>
          <p className="free-shipping">
            {loaderData.productDetails.freeShipping ? "Ücretsiz Kargo" : ""}
          </p>
        </div>
        <p className="update-info">
          <small>
            Son Güncelleme:{" "}
            {loaderData.productDetails.lastUpdate == "now"
              ? "Şimdi"
              : loaderData.productDetails.lastUpdate == "yesterday"
              ? "Dün"
              : loaderData.productDetails.lastUpdate == "2 hours ago"
              ? "2 saat önce"
              : "-"}
          </small>
        </p>
      </div>
    </div>
  );
}
