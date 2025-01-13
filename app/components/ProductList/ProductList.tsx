import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ProductListItem } from "~/models/Product.model";
import HorizontalProductList from "./components/HorizontalProductList/HorizontalProductList";
import VerticalProductList from "./components/VerticalProductList/VerticalProductList";
import "./ProductList.scss";

export default function ProductList() {
  const loaderData = useLoaderData<{
    productList: ProductListItem[];
    nextUrl?: string;
  }>();

  const [productList, setProductList] = useState<ProductListItem[]>(
    loaderData.productList
  );
  const [nextUrl, setNextUrl] = useState<string | undefined>(
    loaderData.nextUrl
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleNextClick = async () => {
    if (!nextUrl) return;

    setLoading(true);
    try {
      const response = await fetch(nextUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setProductList(() => data.productList);
      setNextUrl(data.nextUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <HorizontalProductList />
      <VerticalProductList productList={productList} />

      {nextUrl && (
        <div style={{ display: "flex", width: "90%", margin: "auto" }}>
          <button
            onClick={handleNextClick}
            disabled={loading}
            style={{
              marginTop: "1rem",
              marginRight: "0rem",
              marginLeft: "auto",
              padding: "0.5rem 1rem",
              backgroundColor: loading ? "#ccc" : "#247ec5",
              color: "#fff",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              borderRadius: "6px",
            }}
          >
            {loading ? "Yükleniyor..." : "Sonraki"}
          </button>
        </div>
      )}
    </div>
  );
}
